/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/taskpane/config.ts":
/*!********************************!*\
  !*** ./src/taskpane/config.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   API_CONFIG: function() { return /* binding */ API_CONFIG; },
/* harmony export */   AUTH_STORAGE_KEY: function() { return /* binding */ AUTH_STORAGE_KEY; }
/* harmony export */ });
/**
 * API configuration for Codeplix backend.
 * In development, requests go through the webpack proxy (/api → https://localhost:44372)
 * so the add-in does not require backend CORS changes.
 */
var API_CONFIG = {
  /** Relative base — proxied by webpack-dev-server in development. */
  baseUrl: "/api/v1",
  endpoints: {
    login: "/auth/Login",
    refreshToken: "/auth/RefreshToken",
    saveOpening: "/Openings/SaveOpening",
    getClients: "/Clients/GetClients",
    getClientContacts: "/Clients/GetClientContacts",
    getRecruiters: "/Dashboard/GetRecruitmentRecruiters",
    getSkillsCatalog: "/Openings/GetSkillsCatalog"
  },
  /** Defaults matching Codeplix RecruitmentLookupIds / openings-add. */
  openingDefaults: {
    status: 10,
    // Open
    priority: 15,
    // Medium
    numOpenings: 1,
    workType: 18,
    // On-site
    employmentType: 53,
    // Full time
    interviewType: 23,
    // Standard
    technicalRounds: 1,
    clientRounds: 1,
    finalRounds: 1,
    otherRounds: 0,
    salaryCurrency: "INR",
    salaryPeriod: 21 // Yearly
  }
};
var AUTH_STORAGE_KEY = "codeplix.outlook.auth";

/***/ }),

/***/ "./src/taskpane/outlook.ts":
/*!*********************************!*\
  !*** ./src/taskpane/outlook.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_authService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/authService */ "./src/taskpane/services/authService.ts");
/* harmony import */ var _services_jobDescriptionService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services/jobDescriptionService */ "./src/taskpane/services/jobDescriptionService.ts");
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/* global document, Office */

;

var elements = {
  loginView: function loginView() {
    return document.getElementById("login-view");
  },
  formView: function formView() {
    return document.getElementById("form-view");
  },
  loginEmail: function loginEmail() {
    return document.getElementById("loginEmail");
  },
  loginPassword: function loginPassword() {
    return document.getElementById("loginPassword");
  },
  loginButton: function loginButton() {
    return document.getElementById("loginButton");
  },
  loginMessage: function loginMessage() {
    return document.getElementById("loginMessage");
  },
  logoutButton: function logoutButton() {
    return document.getElementById("logoutButton");
  },
  signedInAs: function signedInAs() {
    return document.getElementById("signedInAs");
  },
  emailSubject: function emailSubject() {
    return document.getElementById("emailSubject");
  },
  openingTitle: function openingTitle() {
    return document.getElementById("openingTitle");
  },
  clientSelect: function clientSelect() {
    return document.getElementById("clientSelect");
  },
  contactSelect: function contactSelect() {
    return document.getElementById("contactSelect");
  },
  recruiterSelect: function recruiterSelect() {
    return document.getElementById("recruiterSelect");
  },
  skillsSelect: function skillsSelect() {
    return document.getElementById("skillsSelect");
  },
  jobDescription: function jobDescription() {
    return document.getElementById("jobDescription");
  },
  submitButton: function submitButton() {
    return document.getElementById("submitButton");
  },
  formMessage: function formMessage() {
    return document.getElementById("formMessage");
  }
};
Office.onReady(function (info) {
  if (info.host !== Office.HostType.Outlook) {
    showMessage(elements.loginMessage(), "This add-in must be opened in Outlook.", "error");
    return;
  }
  elements.loginButton().addEventListener("click", function () {
    void handleLogin();
  });
  elements.logoutButton().addEventListener("click", handleLogout);
  elements.submitButton().addEventListener("click", function () {
    void handleSubmit();
  });
  elements.clientSelect().addEventListener("change", function () {
    void handleClientChange();
  });
  elements.loginEmail().addEventListener("keydown", function (event) {
    if (event.key === "Enter") void handleLogin();
  });
  elements.loginPassword().addEventListener("keydown", function (event) {
    if (event.key === "Enter") void handleLogin();
  });
  var existing = (0,_services_authService__WEBPACK_IMPORTED_MODULE_0__.getStoredSession)();
  if (existing !== null && existing !== void 0 && existing.token) {
    void showFormView(existing.userName || existing.emailId);
  } else {
    showLoginView();
  }
});
function showLoginView() {
  elements.loginView().hidden = false;
  elements.formView().hidden = true;
  clearMessage(elements.loginMessage());
}
function showFormView(_x) {
  return _showFormView.apply(this, arguments);
}
function _showFormView() {
  _showFormView = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(displayName) {
    var session, label;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          elements.loginView().hidden = true;
          elements.formView().hidden = false;
          clearMessage(elements.formMessage());
          session = (0,_services_authService__WEBPACK_IMPORTED_MODULE_0__.getStoredSession)();
          label = displayName || (session === null || session === void 0 ? void 0 : session.userName) || (session === null || session === void 0 ? void 0 : session.emailId) || "Signed in";
          elements.signedInAs().textContent = "Signed in as ".concat(label);
          populateEmailSubject();
          elements.jobDescription().value = "";
          _context.n = 1;
          return loadLookupData();
        case 1:
          elements.jobDescription().focus();
        case 2:
          return _context.a(2);
      }
    }, _callee);
  }));
  return _showFormView.apply(this, arguments);
}
function handleLogout() {
  ;(0,_services_authService__WEBPACK_IMPORTED_MODULE_0__.clearSession)();
  elements.loginPassword().value = "";
  showLoginView();
}
function handleLogin() {
  return _handleLogin.apply(this, arguments);
}
function _handleLogin() {
  _handleLogin = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var email, password, loginButton, _result$session, _result$session2, result, message, _t;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          email = elements.loginEmail().value.trim();
          password = elements.loginPassword().value.trim();
          loginButton = elements.loginButton();
          clearMessage(elements.loginMessage());
          if (!(!email && !password)) {
            _context2.n = 1;
            break;
          }
          showMessage(elements.loginMessage(), "Please enter your email and password.", "error");
          return _context2.a(2);
        case 1:
          if (email) {
            _context2.n = 2;
            break;
          }
          showMessage(elements.loginMessage(), "Please enter your email.", "error");
          return _context2.a(2);
        case 2:
          if (password) {
            _context2.n = 3;
            break;
          }
          showMessage(elements.loginMessage(), "Please enter your password.", "error");
          return _context2.a(2);
        case 3:
          loginButton.disabled = true;
          loginButton.textContent = "Signing in...";
          _context2.p = 4;
          _context2.n = 5;
          return (0,_services_authService__WEBPACK_IMPORTED_MODULE_0__.login)(email, password);
        case 5:
          result = _context2.v;
          if (result.success) {
            _context2.n = 6;
            break;
          }
          showMessage(elements.loginMessage(), result.message, "error");
          return _context2.a(2);
        case 6:
          _context2.n = 7;
          return showFormView(((_result$session = result.session) === null || _result$session === void 0 ? void 0 : _result$session.userName) || ((_result$session2 = result.session) === null || _result$session2 === void 0 ? void 0 : _result$session2.emailId));
        case 7:
          _context2.n = 9;
          break;
        case 8:
          _context2.p = 8;
          _t = _context2.v;
          message = _t instanceof Error ? _t.message : "Login failed.";
          showMessage(elements.loginMessage(), message, "error");
        case 9:
          _context2.p = 9;
          loginButton.disabled = false;
          loginButton.textContent = "Login";
          return _context2.f(9);
        case 10:
          return _context2.a(2);
      }
    }, _callee2, null, [[4, 8, 9, 10]]);
  }));
  return _handleLogin.apply(this, arguments);
}
function loadLookupData() {
  return _loadLookupData.apply(this, arguments);
}
function _loadLookupData() {
  _loadLookupData = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var submitButton, _yield$Promise$all, _yield$Promise$all2, clients, recruiters, skills, message, _t2;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          submitButton = elements.submitButton();
          submitButton.disabled = true;
          showMessage(elements.formMessage(), "Loading clients and recruiters...", "success");
          _context3.p = 1;
          _context3.n = 2;
          return Promise.all([(0,_services_jobDescriptionService__WEBPACK_IMPORTED_MODULE_1__.getClients)(), (0,_services_jobDescriptionService__WEBPACK_IMPORTED_MODULE_1__.getRecruiters)(), (0,_services_jobDescriptionService__WEBPACK_IMPORTED_MODULE_1__.getSkillsCatalog)()]);
        case 2:
          _yield$Promise$all = _context3.v;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 3);
          clients = _yield$Promise$all2[0];
          recruiters = _yield$Promise$all2[1];
          skills = _yield$Promise$all2[2];
          fillSelect(elements.clientSelect(), clients, "Select client", false);
          fillSelect(elements.recruiterSelect(), recruiters, "", true);
          fillSkillsSelect(skills);
          resetContactSelect();
          clearMessage(elements.formMessage());
          _context3.n = 4;
          break;
        case 3:
          _context3.p = 3;
          _t2 = _context3.v;
          message = _t2 instanceof Error ? _t2.message : "Failed to load lookup data.";
          showMessage(elements.formMessage(), message, "error");
          if (/session expired/i.test(message)) {
            (0,_services_authService__WEBPACK_IMPORTED_MODULE_0__.clearSession)();
            showLoginView();
            showMessage(elements.loginMessage(), message, "error");
          }
        case 4:
          _context3.p = 4;
          submitButton.disabled = false;
          return _context3.f(4);
        case 5:
          return _context3.a(2);
      }
    }, _callee3, null, [[1, 3, 4, 5]]);
  }));
  return _loadLookupData.apply(this, arguments);
}
function handleClientChange() {
  return _handleClientChange.apply(this, arguments);
}
function _handleClientChange() {
  _handleClientChange = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
    var clientId, contactSelect, contacts, message, _t3;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          clientId = elements.clientSelect().value;
          contactSelect = elements.contactSelect();
          resetContactSelect();
          if (clientId) {
            _context4.n = 1;
            break;
          }
          return _context4.a(2);
        case 1:
          contactSelect.disabled = true;
          _context4.p = 2;
          _context4.n = 3;
          return (0,_services_jobDescriptionService__WEBPACK_IMPORTED_MODULE_1__.getClientContacts)(clientId);
        case 3:
          contacts = _context4.v;
          fillSelect(contactSelect, contacts, "Select contact (optional)", false);
          contactSelect.disabled = false;
          _context4.n = 5;
          break;
        case 4:
          _context4.p = 4;
          _t3 = _context4.v;
          message = _t3 instanceof Error ? _t3.message : "Failed to load contacts.";
          showMessage(elements.formMessage(), message, "error");
          contactSelect.disabled = true;
        case 5:
          return _context4.a(2);
      }
    }, _callee4, null, [[2, 4]]);
  }));
  return _handleClientChange.apply(this, arguments);
}
function handleSubmit() {
  return _handleSubmit.apply(this, arguments);
}
function _handleSubmit() {
  _handleSubmit = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
    var _getStoredSession;
    var title, jobDescription, clientId, clientContactId, recruiterIds, primarySkills, submitButton, result, message, _t4;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          title = elements.openingTitle().value.trim() || elements.emailSubject().value.trim();
          jobDescription = elements.jobDescription().value.trim();
          clientId = elements.clientSelect().value;
          clientContactId = elements.contactSelect().value || null;
          recruiterIds = selectedValues(elements.recruiterSelect());
          primarySkills = selectedValues(elements.skillsSelect()).join(", ") || null;
          submitButton = elements.submitButton();
          clearMessage(elements.formMessage());
          if ((_getStoredSession = (0,_services_authService__WEBPACK_IMPORTED_MODULE_0__.getStoredSession)()) !== null && _getStoredSession !== void 0 && _getStoredSession.token) {
            _context5.n = 1;
            break;
          }
          showLoginView();
          showMessage(elements.loginMessage(), "Please log in again.", "error");
          return _context5.a(2);
        case 1:
          if (title) {
            _context5.n = 2;
            break;
          }
          showMessage(elements.formMessage(), "Please enter a title.", "error");
          return _context5.a(2);
        case 2:
          if (clientId) {
            _context5.n = 3;
            break;
          }
          showMessage(elements.formMessage(), "Please select a client.", "error");
          return _context5.a(2);
        case 3:
          if (recruiterIds.length) {
            _context5.n = 4;
            break;
          }
          showMessage(elements.formMessage(), "Please select at least one recruiter.", "error");
          return _context5.a(2);
        case 4:
          if (jobDescription) {
            _context5.n = 5;
            break;
          }
          showMessage(elements.formMessage(), "Please enter a job description.", "error");
          return _context5.a(2);
        case 5:
          submitButton.disabled = true;
          submitButton.textContent = "Submitting...";
          _context5.p = 6;
          _context5.n = 7;
          return (0,_services_jobDescriptionService__WEBPACK_IMPORTED_MODULE_1__.saveJobDescription)({
            title: title,
            jobDescription: jobDescription,
            clientId: clientId,
            clientContactId: clientContactId,
            recruiterIds: recruiterIds,
            primarySkills: primarySkills
          });
        case 7:
          result = _context5.v;
          showMessage(elements.formMessage(), result.message, result.success ? "success" : "error");
          if (result.success) {
            elements.jobDescription().value = "";
          }
          if (!result.success && /session expired/i.test(result.message)) {
            (0,_services_authService__WEBPACK_IMPORTED_MODULE_0__.clearSession)();
            showLoginView();
            showMessage(elements.loginMessage(), result.message, "error");
          }
          _context5.n = 9;
          break;
        case 8:
          _context5.p = 8;
          _t4 = _context5.v;
          message = _t4 instanceof Error ? _t4.message : "Failed to save job description.";
          showMessage(elements.formMessage(), message, "error");
        case 9:
          _context5.p = 9;
          submitButton.disabled = false;
          submitButton.textContent = "Submit";
          return _context5.f(9);
        case 10:
          return _context5.a(2);
      }
    }, _callee5, null, [[6, 8, 9, 10]]);
  }));
  return _handleSubmit.apply(this, arguments);
}
function populateEmailSubject() {
  var _Office$context$mailb;
  var subjectInput = elements.emailSubject();
  var titleInput = elements.openingTitle();
  var item = (_Office$context$mailb = Office.context.mailbox) === null || _Office$context$mailb === void 0 ? void 0 : _Office$context$mailb.item;
  if (!item) {
    subjectInput.value = "";
    showMessage(elements.formMessage(), "Unable to read the current email. Open a message and try again.", "error");
    return;
  }
  var subject = item.subject || "";
  subjectInput.value = subject;
  if (!titleInput.value.trim()) {
    titleInput.value = subject;
  }
}
function fillSelect(select, options, placeholder, multiple) {
  select.innerHTML = "";
  if (!multiple && placeholder) {
    var empty = document.createElement("option");
    empty.value = "";
    empty.textContent = placeholder;
    select.appendChild(empty);
  }
  var _iterator = _createForOfIteratorHelper(options),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var option = _step.value;
      var el = document.createElement("option");
      el.value = option.id;
      el.textContent = option.name;
      select.appendChild(el);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
function fillSkillsSelect(skills) {
  var select = elements.skillsSelect();
  select.innerHTML = "";
  var _iterator2 = _createForOfIteratorHelper(skills),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var skill = _step2.value;
      var el = document.createElement("option");
      el.value = skill;
      el.textContent = skill;
      select.appendChild(el);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}
function resetContactSelect() {
  var contactSelect = elements.contactSelect();
  contactSelect.innerHTML = "";
  var empty = document.createElement("option");
  empty.value = "";
  empty.textContent = "Select contact (optional)";
  contactSelect.appendChild(empty);
  contactSelect.disabled = true;
}
function selectedValues(select) {
  return Array.from(select.selectedOptions).map(function (opt) {
    return opt.value.trim();
  }).filter(Boolean);
}
function showMessage(target, text, type) {
  target.textContent = text;
  target.className = "message ".concat(type);
}
function clearMessage(target) {
  target.textContent = "";
  target.className = "message";
}

/***/ }),

/***/ "./src/taskpane/services/authService.ts":
/*!**********************************************!*\
  !*** ./src/taskpane/services/authService.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearSession: function() { return /* binding */ clearSession; },
/* harmony export */   getStoredSession: function() { return /* binding */ getStoredSession; },
/* harmony export */   login: function() { return /* binding */ login; },
/* harmony export */   refreshToken: function() { return /* binding */ refreshToken; }
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/taskpane/config.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
;
function storage() {
  try {
    return window.sessionStorage;
  } catch (_unused) {
    return null;
  }
}
function getStoredSession() {
  var _storage;
  var raw = (_storage = storage()) === null || _storage === void 0 ? void 0 : _storage.getItem(_config__WEBPACK_IMPORTED_MODULE_0__.AUTH_STORAGE_KEY);
  if (!raw) return null;
  try {
    var parsed = JSON.parse(raw);
    return parsed !== null && parsed !== void 0 && parsed.token ? parsed : null;
  } catch (_unused2) {
    return null;
  }
}
function clearSession() {
  var _storage2;
  (_storage2 = storage()) === null || _storage2 === void 0 || _storage2.removeItem(_config__WEBPACK_IMPORTED_MODULE_0__.AUTH_STORAGE_KEY);
}
function saveSession(session) {
  var _storage3;
  (_storage3 = storage()) === null || _storage3 === void 0 || _storage3.setItem(_config__WEBPACK_IMPORTED_MODULE_0__.AUTH_STORAGE_KEY, JSON.stringify(session));
}
function toSession(data) {
  var _data$userId, _data$userName, _data$emailId, _data$companyId, _data$companyName;
  if (!(data !== null && data !== void 0 && data.token)) return null;
  return {
    token: data.token,
    userId: String((_data$userId = data.userId) !== null && _data$userId !== void 0 ? _data$userId : ""),
    userName: String((_data$userName = data.userName) !== null && _data$userName !== void 0 ? _data$userName : ""),
    emailId: String((_data$emailId = data.emailId) !== null && _data$emailId !== void 0 ? _data$emailId : ""),
    companyId: String((_data$companyId = data.companyId) !== null && _data$companyId !== void 0 ? _data$companyId : ""),
    companyName: String((_data$companyName = data.companyName) !== null && _data$companyName !== void 0 ? _data$companyName : "")
  };
}
function parseEnvelope(_x) {
  return _parseEnvelope.apply(this, arguments);
}
/**
 * Login against Codeplix auth API.
 * Only uses POST /api/v1/auth/Login.
 */
function _parseEnvelope() {
  _parseEnvelope = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(response) {
    var text, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.n = 1;
          return response.text();
        case 1:
          text = _context.v;
          if (text) {
            _context.n = 2;
            break;
          }
          return _context.a(2, {
            success: response.ok,
            message: response.statusText || "Empty response"
          });
        case 2:
          _context.p = 2;
          return _context.a(2, JSON.parse(text));
        case 3:
          _context.p = 3;
          _t = _context.v;
          return _context.a(2, {
            success: false,
            message: "Unexpected response from server."
          });
      }
    }, _callee, null, [[2, 3]]);
  }));
  return _parseEnvelope.apply(this, arguments);
}
function login(_x2, _x3) {
  return _login.apply(this, arguments);
}

/**
 * Refresh access token.
 * Only uses POST /api/v1/auth/RefreshToken (cookie-based).
 */
function _login() {
  _login = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(email, password) {
    var _envelope$data;
    var url, response, envelope, session, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          url = "".concat(_config__WEBPACK_IMPORTED_MODULE_0__.API_CONFIG.baseUrl).concat(_config__WEBPACK_IMPORTED_MODULE_0__.API_CONFIG.endpoints.login);
          _context2.p = 1;
          _context2.n = 2;
          return fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              email: email,
              password: password
            })
          });
        case 2:
          response = _context2.v;
          _context2.n = 4;
          break;
        case 3:
          _context2.p = 3;
          _t2 = _context2.v;
          return _context2.a(2, {
            success: false,
            message: "Cannot reach Codeplix API. Ensure the backend and add-in proxy are running."
          });
        case 4:
          _context2.n = 5;
          return parseEnvelope(response);
        case 5:
          envelope = _context2.v;
          if (!(!response.ok || !envelope.success)) {
            _context2.n = 6;
            break;
          }
          return _context2.a(2, {
            success: false,
            message: envelope.message || "Login failed (".concat(response.status, ").")
          });
        case 6:
          session = toSession((_envelope$data = envelope.data) !== null && _envelope$data !== void 0 ? _envelope$data : {});
          if (session) {
            _context2.n = 7;
            break;
          }
          return _context2.a(2, {
            success: false,
            message: "Login succeeded but no token was returned."
          });
        case 7:
          saveSession(session);
          return _context2.a(2, {
            success: true,
            message: envelope.message || "Login successful",
            session: session
          });
      }
    }, _callee2, null, [[1, 3]]);
  }));
  return _login.apply(this, arguments);
}
function refreshToken() {
  return _refreshToken.apply(this, arguments);
}
function _refreshToken() {
  _refreshToken = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var url, current, _envelope$data2, response, envelope, session, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          url = "".concat(_config__WEBPACK_IMPORTED_MODULE_0__.API_CONFIG.baseUrl).concat(_config__WEBPACK_IMPORTED_MODULE_0__.API_CONFIG.endpoints.refreshToken);
          current = getStoredSession();
          _context3.p = 1;
          _context3.n = 2;
          return fetch(url, {
            method: "POST",
            credentials: "include",
            headers: _objectSpread({
              Accept: "application/json"
            }, current !== null && current !== void 0 && current.token ? {
              Authorization: "Bearer ".concat(current.token)
            } : {})
          });
        case 2:
          response = _context3.v;
          _context3.n = 3;
          return parseEnvelope(response);
        case 3:
          envelope = _context3.v;
          if (!(!response.ok || !envelope.success)) {
            _context3.n = 4;
            break;
          }
          clearSession();
          return _context3.a(2, false);
        case 4:
          session = toSession((_envelope$data2 = envelope.data) !== null && _envelope$data2 !== void 0 ? _envelope$data2 : {});
          if (session) {
            _context3.n = 5;
            break;
          }
          clearSession();
          return _context3.a(2, false);
        case 5:
          saveSession(session);
          return _context3.a(2, true);
        case 6:
          _context3.p = 6;
          _t3 = _context3.v;
          clearSession();
          return _context3.a(2, false);
      }
    }, _callee3, null, [[1, 6]]);
  }));
  return _refreshToken.apply(this, arguments);
}

/***/ }),

/***/ "./src/taskpane/services/jobDescriptionService.ts":
/*!********************************************************!*\
  !*** ./src/taskpane/services/jobDescriptionService.ts ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getClientContacts: function() { return /* binding */ getClientContacts; },
/* harmony export */   getClients: function() { return /* binding */ getClients; },
/* harmony export */   getRecruiters: function() { return /* binding */ getRecruiters; },
/* harmony export */   getSkillsCatalog: function() { return /* binding */ getSkillsCatalog; },
/* harmony export */   saveJobDescription: function() { return /* binding */ saveJobDescription; }
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./src/taskpane/config.ts");
/* harmony import */ var _authService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./authService */ "./src/taskpane/services/authService.ts");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
;

function parseJson(_x) {
  return _parseJson.apply(this, arguments);
}
function _parseJson() {
  _parseJson = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(response) {
    var text, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.n = 1;
          return response.text();
        case 1:
          text = _context.v;
          if (text) {
            _context.n = 2;
            break;
          }
          return _context.a(2, {
            success: response.ok,
            message: response.statusText || "Empty response"
          });
        case 2:
          _context.p = 2;
          return _context.a(2, JSON.parse(text));
        case 3:
          _context.p = 3;
          _t = _context.v;
          return _context.a(2, {
            success: false,
            message: "Unexpected response from server."
          });
      }
    }, _callee, null, [[2, 3]]);
  }));
  return _parseJson.apply(this, arguments);
}
function authHeaders() {
  var session = (0,_authService__WEBPACK_IMPORTED_MODULE_1__.getStoredSession)();
  var headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };
  if (session !== null && session !== void 0 && session.token) {
    headers.Authorization = "Bearer ".concat(session.token);
  }
  return headers;
}
function apiFetch(_x2) {
  return _apiFetch.apply(this, arguments);
}
function _apiFetch() {
  _apiFetch = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(path) {
    var init,
      retried,
      url,
      response,
      refreshed,
      envelope,
      _args2 = arguments,
      _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          init = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
          retried = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : false;
          url = "".concat(_config__WEBPACK_IMPORTED_MODULE_0__.API_CONFIG.baseUrl).concat(path);
          _context2.p = 1;
          _context2.n = 2;
          return fetch(url, _objectSpread(_objectSpread({}, init), {}, {
            credentials: "include",
            headers: _objectSpread(_objectSpread({}, authHeaders()), init.headers || {})
          }));
        case 2:
          response = _context2.v;
          _context2.n = 4;
          break;
        case 3:
          _context2.p = 3;
          _t2 = _context2.v;
          return _context2.a(2, {
            success: false,
            message: "Cannot reach Codeplix API. Ensure the backend and add-in proxy are running."
          });
        case 4:
          if (!(response.status === 401 && !retried)) {
            _context2.n = 7;
            break;
          }
          _context2.n = 5;
          return (0,_authService__WEBPACK_IMPORTED_MODULE_1__.refreshToken)();
        case 5:
          refreshed = _context2.v;
          if (!refreshed) {
            _context2.n = 6;
            break;
          }
          return _context2.a(2, apiFetch(path, init, true));
        case 6:
          (0,_authService__WEBPACK_IMPORTED_MODULE_1__.clearSession)();
          return _context2.a(2, {
            success: false,
            message: "Session expired. Please log in again."
          });
        case 7:
          _context2.n = 8;
          return parseJson(response);
        case 8:
          envelope = _context2.v;
          if (!(!response.ok || envelope.success === false)) {
            _context2.n = 9;
            break;
          }
          return _context2.a(2, {
            success: false,
            message: envelope.message || "Request failed (".concat(response.status, ")."),
            data: envelope.data
          });
        case 9:
          return _context2.a(2, {
            success: true,
            message: envelope.message,
            data: envelope.data
          });
      }
    }, _callee2, null, [[1, 3]]);
  }));
  return _apiFetch.apply(this, arguments);
}
function asArray(data) {
  var _data$items;
  if (!data) return [];
  if (Array.isArray(data)) return data;
  return (_data$items = data.items) !== null && _data$items !== void 0 ? _data$items : [];
}
function pickName(row) {
  var _ref, _ref2, _ref3, _ref4, _row$name;
  var name = (_ref = (_ref2 = (_ref3 = (_ref4 = (_row$name = row.name) !== null && _row$name !== void 0 ? _row$name : row.clientName) !== null && _ref4 !== void 0 ? _ref4 : row.userName) !== null && _ref3 !== void 0 ? _ref3 : row.fullName) !== null && _ref2 !== void 0 ? _ref2 : row.displayName) !== null && _ref !== void 0 ? _ref : row.email;
  return String(name !== null && name !== void 0 ? name : "").trim() || "Unnamed";
}
function pickId(row) {
  var _ref5, _row$id;
  return String((_ref5 = (_row$id = row.id) !== null && _row$id !== void 0 ? _row$id : row.userId) !== null && _ref5 !== void 0 ? _ref5 : "").trim();
}

/**
 * GET /api/v1/Clients/GetClients
 */
function getClients() {
  return _getClients.apply(this, arguments);
}

/**
 * GET /api/v1/Clients/GetClientContacts
 */
function _getClients() {
  _getClients = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
    var qs, result;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          qs = new URLSearchParams({
            pageNumber: "1",
            pageSize: "100"
          });
          _context3.n = 1;
          return apiFetch("".concat(_config__WEBPACK_IMPORTED_MODULE_0__.API_CONFIG.endpoints.getClients, "?").concat(qs.toString()), {
            method: "GET"
          });
        case 1:
          result = _context3.v;
          if (result.success) {
            _context3.n = 2;
            break;
          }
          throw new Error(result.message || "Failed to load clients.");
        case 2:
          return _context3.a(2, asArray(result.data).map(function (row) {
            return {
              id: pickId(row),
              name: pickName(row)
            };
          }).filter(function (x) {
            return x.id;
          }));
      }
    }, _callee3);
  }));
  return _getClients.apply(this, arguments);
}
function getClientContacts(_x3) {
  return _getClientContacts.apply(this, arguments);
}

/**
 * GET /api/v1/Dashboard/GetRecruitmentRecruiters
 */
function _getClientContacts() {
  _getClientContacts = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(clientId) {
    var qs, result;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          if (clientId) {
            _context4.n = 1;
            break;
          }
          return _context4.a(2, []);
        case 1:
          qs = new URLSearchParams({
            clientId: clientId,
            pageNumber: "1",
            pageSize: "100"
          });
          _context4.n = 2;
          return apiFetch("".concat(_config__WEBPACK_IMPORTED_MODULE_0__.API_CONFIG.endpoints.getClientContacts, "?").concat(qs.toString()), {
            method: "GET"
          });
        case 2:
          result = _context4.v;
          if (result.success) {
            _context4.n = 3;
            break;
          }
          throw new Error(result.message || "Failed to load contacts.");
        case 3:
          return _context4.a(2, asArray(result.data).map(function (row) {
            return {
              id: pickId(row),
              name: pickName(row)
            };
          }).filter(function (x) {
            return x.id;
          }));
      }
    }, _callee4);
  }));
  return _getClientContacts.apply(this, arguments);
}
function getRecruiters() {
  return _getRecruiters.apply(this, arguments);
}

/**
 * GET /api/v1/Openings/GetSkillsCatalog
 */
function _getRecruiters() {
  _getRecruiters = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
    var _result$data;
    var result;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.n) {
        case 0:
          _context5.n = 1;
          return apiFetch(_config__WEBPACK_IMPORTED_MODULE_0__.API_CONFIG.endpoints.getRecruiters, {
            method: "GET"
          });
        case 1:
          result = _context5.v;
          if (result.success) {
            _context5.n = 2;
            break;
          }
          throw new Error(result.message || "Failed to load recruiters.");
        case 2:
          return _context5.a(2, ((_result$data = result.data) !== null && _result$data !== void 0 ? _result$data : []).map(function (row) {
            return {
              id: pickId(row),
              name: pickName(row)
            };
          }).filter(function (x) {
            return x.id;
          }));
      }
    }, _callee5);
  }));
  return _getRecruiters.apply(this, arguments);
}
function getSkillsCatalog() {
  return _getSkillsCatalog.apply(this, arguments);
}

/**
 * POST /api/v1/Openings/SaveOpening
 */
function _getSkillsCatalog() {
  _getSkillsCatalog = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
    var _result$data2;
    var result;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          _context6.n = 1;
          return apiFetch(_config__WEBPACK_IMPORTED_MODULE_0__.API_CONFIG.endpoints.getSkillsCatalog, {
            method: "GET"
          });
        case 1:
          result = _context6.v;
          if (result.success) {
            _context6.n = 2;
            break;
          }
          throw new Error(result.message || "Failed to load skills.");
        case 2:
          return _context6.a(2, ((_result$data2 = result.data) !== null && _result$data2 !== void 0 ? _result$data2 : []).map(function (s) {
            return String(s).trim();
          }).filter(Boolean));
      }
    }, _callee6);
  }));
  return _getSkillsCatalog.apply(this, arguments);
}
function saveJobDescription(_x4) {
  return _saveJobDescription.apply(this, arguments);
}
function _saveJobDescription() {
  _saveJobDescription = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(payload) {
    var _payload$title, _payload$jobDescripti, _payload$clientId, _payload$recruiterIds, _payload$clientContac, _payload$primarySkill;
    var title, jobDescription, clientId, recruiterIds, body, result;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.n) {
        case 0:
          title = (_payload$title = payload.title) === null || _payload$title === void 0 ? void 0 : _payload$title.trim();
          jobDescription = (_payload$jobDescripti = payload.jobDescription) === null || _payload$jobDescripti === void 0 ? void 0 : _payload$jobDescripti.trim();
          clientId = (_payload$clientId = payload.clientId) === null || _payload$clientId === void 0 ? void 0 : _payload$clientId.trim();
          recruiterIds = ((_payload$recruiterIds = payload.recruiterIds) !== null && _payload$recruiterIds !== void 0 ? _payload$recruiterIds : []).map(function (id) {
            return String(id).trim();
          }).filter(Boolean);
          if (title) {
            _context7.n = 1;
            break;
          }
          return _context7.a(2, {
            success: false,
            message: "Title is required."
          });
        case 1:
          if (jobDescription) {
            _context7.n = 2;
            break;
          }
          return _context7.a(2, {
            success: false,
            message: "Job description is required."
          });
        case 2:
          if (clientId) {
            _context7.n = 3;
            break;
          }
          return _context7.a(2, {
            success: false,
            message: "Please select a client."
          });
        case 3:
          if (recruiterIds.length) {
            _context7.n = 4;
            break;
          }
          return _context7.a(2, {
            success: false,
            message: "Please select at least one recruiter."
          });
        case 4:
          if (!(jobDescription.length > 8000)) {
            _context7.n = 5;
            break;
          }
          return _context7.a(2, {
            success: false,
            message: "Job description must be at most 8000 characters."
          });
        case 5:
          body = _objectSpread(_objectSpread({}, _config__WEBPACK_IMPORTED_MODULE_0__.API_CONFIG.openingDefaults), {}, {
            clientId: clientId,
            clientContactId: ((_payload$clientContac = payload.clientContactId) === null || _payload$clientContac === void 0 ? void 0 : _payload$clientContac.trim()) || null,
            title: title,
            jobDescription: jobDescription,
            primarySkills: ((_payload$primarySkill = payload.primarySkills) === null || _payload$primarySkill === void 0 ? void 0 : _payload$primarySkill.trim()) || null,
            recruiterIds: recruiterIds
          });
          _context7.n = 6;
          return apiFetch(_config__WEBPACK_IMPORTED_MODULE_0__.API_CONFIG.endpoints.saveOpening, {
            method: "POST",
            body: JSON.stringify(body)
          });
        case 6:
          result = _context7.v;
          if (result.success) {
            _context7.n = 7;
            break;
          }
          return _context7.a(2, {
            success: false,
            message: result.message || "Failed to save opening."
          });
        case 7:
          return _context7.a(2, {
            success: true,
            message: result.message || "Opening created successfully. It will appear under Recruitment → Openings."
          });
      }
    }, _callee7);
  }));
  return _saveJobDescription.apply(this, arguments);
}

/***/ }),

/***/ "./src/taskpane/taskpane.css":
/*!***********************************!*\
  !*** ./src/taskpane/taskpane.css ***!
  \***********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "db39700f64052de3757c.css";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		__webpack_require__.b = (typeof document !== 'undefined' && document.baseURI) || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"taskpane": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other entry modules.
!function() {
var __webpack_exports__ = {};
/*!**********************************!*\
  !*** ./src/taskpane/taskpane.ts ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _outlook__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./outlook */ "./src/taskpane/outlook.ts");

}();
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other entry modules.
!function() {
/*!************************************!*\
  !*** ./src/taskpane/taskpane.html ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
// Imports
var ___HTML_LOADER_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./taskpane.css */ "./src/taskpane/taskpane.css"), __webpack_require__.b);
// Module
var code = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\" />\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=Edge\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <title>Job Description Saver</title>\n  <" + "script type=\"text/javascript\" src=\"https://appsforoffice.microsoft.com/lib/1/hosted/office.js\"><" + "/script>\n  <link rel=\"stylesheet\" href=\"" + ___HTML_LOADER_IMPORT_0___ + "\" />\n</head>\n\n<body>\n  <div class=\"container\">\n\n    <!-- Login view -->\n    <section id=\"login-view\" class=\"view\">\n      <div class=\"header\">\n        <h1>Job Description Saver</h1>\n        <p>Sign in with your Codeplix account</p>\n      </div>\n\n      <div class=\"card\">\n        <div class=\"field\">\n          <label for=\"loginEmail\">Email</label>\n          <input\n            id=\"loginEmail\"\n            type=\"email\"\n            autocomplete=\"username\"\n            placeholder=\"Enter your email\"\n          />\n        </div>\n\n        <div class=\"field\">\n          <label for=\"loginPassword\">Password</label>\n          <input\n            id=\"loginPassword\"\n            type=\"password\"\n            autocomplete=\"current-password\"\n            placeholder=\"Enter your password\"\n          />\n        </div>\n\n        <button id=\"loginButton\" type=\"button\">Login</button>\n        <div id=\"loginMessage\" class=\"message\" role=\"status\" aria-live=\"polite\"></div>\n      </div>\n    </section>\n\n    <!-- Job Description Saver view (shown after login) -->\n    <section id=\"form-view\" class=\"view\" hidden>\n      <div class=\"header header-row\">\n        <div>\n          <h1>Job Description Saver</h1>\n          <p id=\"signedInAs\" class=\"signed-in\"></p>\n        </div>\n        <button id=\"logoutButton\" type=\"button\" class=\"btn-secondary btn-small\">Logout</button>\n      </div>\n      <hr class=\"divider\" />\n\n      <div class=\"card\">\n        <div class=\"field\">\n          <label for=\"emailSubject\">Email Subject</label>\n          <input id=\"emailSubject\" type=\"text\" readonly />\n        </div>\n\n        <div class=\"field\">\n          <label for=\"openingTitle\">Title <span class=\"required\">*</span></label>\n          <input id=\"openingTitle\" type=\"text\" placeholder=\"Opening title\" />\n        </div>\n\n        <div class=\"field\">\n          <label for=\"clientSelect\">Client <span class=\"required\">*</span></label>\n          <select id=\"clientSelect\">\n            <option value=\"\">Select client</option>\n          </select>\n        </div>\n\n        <div class=\"field\">\n          <label for=\"contactSelect\">Contact</label>\n          <select id=\"contactSelect\" disabled>\n            <option value=\"\">Select contact (optional)</option>\n          </select>\n        </div>\n\n        <div class=\"field\">\n          <label for=\"recruiterSelect\">Recruiters <span class=\"required\">*</span></label>\n          <select id=\"recruiterSelect\" multiple size=\"4\">\n          </select>\n          <p class=\"hint\">Hold Ctrl (Windows) to select multiple.</p>\n        </div>\n\n        <div class=\"field\">\n          <label for=\"skillsSelect\">Skills</label>\n          <select id=\"skillsSelect\" multiple size=\"4\">\n          </select>\n          <p class=\"hint\">Optional. Hold Ctrl to select multiple.</p>\n        </div>\n\n        <div class=\"field\">\n          <label for=\"jobDescription\">Job Description <span class=\"required\">*</span></label>\n          <textarea\n            id=\"jobDescription\"\n            placeholder=\"Paste the job description from the email here...\"\n          ></textarea>\n        </div>\n\n        <button id=\"submitButton\" type=\"button\">Submit</button>\n        <div id=\"formMessage\" class=\"message\" role=\"status\" aria-live=\"polite\"></div>\n      </div>\n    </section>\n\n  </div>\n</body>\n</html>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);
}();
/******/ })()
;
//# sourceMappingURL=taskpane.js.map