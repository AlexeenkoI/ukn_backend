var router = require('express').Router();
var Authorizer = require('./functionality/authorizer');
var Customer = require('./functionality/customer');
var Index = require('./functionality/index');
var User = require('./functionality/user');
var Contract = require('./functionality/contract');
var StatusType = require('./functionality/status_type');
var UserRole = require('./functionality/user_role');
var WorkType = require('./functionality/work_type');

router.get('/', Index.Express);
router.post('/login',Authorizer.Login);
router.post('/logout', Authorizer.LogOut);

router.use('/customers', Authorizer.Checktoken);
router.post('/customers/getcustomers', Customer.GetCustomers);
router.post('/customers/getcustomer/:id', Customer.GetCustomer);
router.put('/customers/updatecustomer/:id', Customer.UpdateCustomer);
router.delete('/customers/deletecustomer/:id',Customer.DeleteCustomer);
router.put('/customers/createcustomer', Customer.CreateCustomer);

router.use('/users', Authorizer.Checktoken);
router.post('/users/getusers', User.GetUsers);
router.post('/users/getuser/:id', User.GetUser);
router.put('/users/updateuser/:id', User.UpdateUser);
router.put('/users/createuser', User.CreateUser);
router.delete('/users/deleteuser/:id', User.DeleteUser);

router.use('/contracts', Authorizer.Checktoken);
router.post('/contracts/getcontracts',Contract.GetContracts);
router.post('/contracts/getcontract/:id', Contract.GetContract);
router.put('/contracts/updatecontract/:id', Contract.UpdateContracts);
router.put('/contracts/createcontract', Contract.CreateContract);
router.delete('/contracts/deletecontract/:id', Contract.DeleteContract);

router.use('/statustypes', Authorizer.Checktoken);
router.post('/statustypes/getstatustypes',StatusType.GetStatusTypes);
router.post('/statustypes/getstatustype/:id', StatusType.GetStatusType);
router.put('/statustypes/updatestatustype/:id', StatusType.UpdateStatusType);
router.put('/statustypes/createstatustype', StatusType.CreateStatusType);
router.delete('/statustypes/deletestatustype/:id', StatusType.DeleteStatusType);

router.use('/userroles', Authorizer.Checktoken);
router.post('/userroles/getuserroles',UserRole.GetUserRoles);
router.post('/userroles/getuserrole/:id', UserRole.GetUserRole);
router.put('/userroles/updateuserrole/:id', UserRole.UpdateUserRole);
router.put('/userroles/createuserrole', UserRole.CreateUserRole);
router.delete('/userroles/deleteuserrole/:id', UserRole.DeleteUserRole);

router.use('/worktypes', Authorizer.Checktoken);
router.post('/worktypes/getworktypes',WorkType.GetWorkTypes);
router.post('/worktypes/getworktype/:id', WorkType.GetWorkType);
router.put('/worktypes/updateworktype/:id', WorkType.UpdateWorkType);
router.put('/worktypes/createworktype', WorkType.CreateWorkType);
router.delete('/worktypes/deleteworktype/:id', WorkType.DeleteWorkType);

router.post('/test', Authorizer.Test);



module.exports = router;

