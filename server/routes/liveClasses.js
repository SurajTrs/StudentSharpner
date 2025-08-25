const express = require('express');
const router = express.Router();

const liveClasses = [
  { id: 1, class: '12', subject: 'Physics', teacher: 'Dr. Verma', time: 'Ongoing', link: 'https://example.com/join' },
  { id: 2, class: '11', subject: 'Maths', teacher: 'Mr. Raj', time: 'Upcoming', link: '#' }
];

router.get('/', (req, res) => {
  res.json(liveClasses);
});

module.exports = router;
