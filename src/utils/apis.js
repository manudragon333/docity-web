export const apis = {
  login: "/auth/login",
  register: "/auth/register",
  validateEmail: "/auth/validateEmail",
  authUser: "/auth/users",
  resetPassword: "/auth/resetPassword",
  verifyLink: "/auth/resend/verify-link",
  profile: "/me",
  uploadProfilePic: "/me/profileImage",
  userAttachments: "/me/attachments",
  propertyTypes: "/masterdata/propertyTypes",
  regions: "/masterdata/regions",
  // verifyProperty: "/property-contact/verify",
  // contactMe: "/property-contact/contact",
  verifyProperty: "/propertyRequests/verifyRequests",
  contactMe: "/propertyRequests/contacts",
  uploadTypes: "/masterdata/documentTypes",
  orderId: "/payments/propertyRequests",
  payCapture: "/payments/propertyRequests/capture",
  fetchProperty: (request_id) =>
    `/propertyRequests/verifyRequests/${request_id}`,
  uploadDoc: (request_id) =>
    `/propertyRequests/verifyRequests/${request_id}/docs`,
  deleteDoc: (request_id, doc_id) =>
    `/propertyRequests/verifyRequests/${request_id}/docs/${doc_id}`,
  documentWriter: (request_id) =>
    `/propertyRequests/verifyRequests/${request_id}/documentWriter`,
  assignCE: (request_id) =>
    `propertyRequests/verifyRequests/${request_id}/civilEngineers`,
  fetchAssessments: `/assessments/questions`,
  submitAssessments: `/assessments/submit`,
  fetchCE: `/users?roles=CIVIL_ENGINEER&status=1`,
  cePropertyAction: (request_id, action) =>
    `/propertyRequests/verifyRequests/${request_id}/civilEngineers/actions/${action}`,
  inviteCE: "/users/invite/CIVIL_ENGINEER",
  verifyToken: (tk) => `/auth/invite/verify?tk=${tk}`,
  changePassword: "/me/resetPassword",
  forgotPassword: "/auth/forgetPassword",
  annotations: (request_id, doc_id) =>
    `/propertyRequests/verifyRequests/${request_id}/docs/${doc_id}/comments`,
  updateAnnotations: (request_id, doc_id, comment_id) =>
    `/propertyRequests/verifyRequests/${request_id}/docs/${doc_id}/comments/${comment_id}`,
  finalReport: (request_id) =>
    `/propertyRequests/verifyRequests/${request_id}/finalReport`,
  shareReport: `/users/shareReport`,
  queryTypes: "/masterdata/queryTypes",
  contactUs: `/contactUs`,
};
