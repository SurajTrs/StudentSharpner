// routes/courseRoutes.js

const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();

const db = () => {
  if (!admin.apps.length) throw new Error('Firebase not initialized');
  return admin.firestore();
};

// Get all courses
router.get('/', async (req, res) => {
  try {
    const snapshot = await db().collection('courses').get();
    const courses = snapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new course
router.post('/', async (req, res) => {
  try {
    const data = req.body || {};
    const ref = await db().collection('courses').add({
      title: data.title,
      description: data.description || '',
      category: data.category || '',
      path: data.path || '',
      classLevel: data.classLevel || '',
      isLive: Boolean(data.isLive),
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    const created = await ref.get();
    res.status(201).json({ _id: created.id, ...created.data() });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get live courses by class level
router.get('/live/:classLevel', async (req, res) => {
  try {
    const { classLevel } = req.params;
    const snapshot = await db()
      .collection('courses')
      .where('classLevel', '==', classLevel)
      .where('isLive', '==', true)
      .get();
    const liveCourses = snapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }));
    res.json(liveCourses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get the authenticated user's purchased courses by email
// Expects query param ?email=
router.get('/my', async (req, res) => {
  try {
    const email = (req.query.email || '').trim().toLowerCase();
    if (!email) return res.status(400).json({ error: 'email is required' });

    const firestore = db();

    // purchases: { userEmail, courseId, purchasedAt }
    const purchasesSnap = await firestore
      .collection('purchases')
      .where('userEmail', '==', email)
      .get();

    if (purchasesSnap.empty) return res.json([]);

    const courseIds = purchasesSnap.docs
      .map(d => d.data()?.courseId)
      .filter(Boolean);

    if (!courseIds.length) return res.json([]);

    // Firestore allows up to 10 IDs in an 'in' query. Chunk if necessary.
    const chunks = [];
    for (let i = 0; i < courseIds.length; i += 10) {
      chunks.push(courseIds.slice(i, i + 10));
    }

    const results = [];
    for (const ids of chunks) {
      const snap = await firestore
        .collection('courses')
        .where(admin.firestore.FieldPath.documentId(), 'in', ids)
        .get();
      results.push(...snap.docs.map(doc => ({ _id: doc.id, ...doc.data() })));
    }

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Record a purchase for a user (idempotent)
router.post('/purchase', async (req, res) => {
  try {
    const userEmail = (req.body?.userEmail || '').trim().toLowerCase();
    const courseId = (req.body?.courseId || '').trim();
    if (!userEmail || !courseId) {
      return res.status(400).json({ error: 'userEmail and courseId are required' });
    }

    const firestore = db();
    const docId = `${userEmail}__${courseId}`; // idempotent key
    const purchaseRef = firestore.collection('purchases').doc(docId);
    const existing = await purchaseRef.get();

    if (existing.exists) {
      return res.status(200).json({ ok: true, status: 'exists' });
    }

    await purchaseRef.set({
      userEmail,
      courseId,
      purchasedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
