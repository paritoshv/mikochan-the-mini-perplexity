import express from 'express';
import searchController from '../controllers/search.controller.js';

/* Route specific middleware */
const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
      .get(searchController.search);

export default router;