import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { validationWhitelist } from './whitelist.validation';
import { WhiteListcontroller } from './whitelist.controller';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/add-whitelist',
  auth(USER_ROLE.admin, USER_ROLE.customer, USER_ROLE.superAdmin),
  validateRequest(validationWhitelist.WhiteListSchemaZod),
  WhiteListcontroller.addWhiteList,
);
router.get(
  '/allwhitelist',
  auth(USER_ROLE.admin, USER_ROLE.customer, USER_ROLE.superAdmin),
  WhiteListcontroller.getallWhiteList,
);

export const WhitelistRoutes = router;
