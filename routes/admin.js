const express = require("express");
const AdminBroExpress = require("@admin-bro/express");
const AdminBro = require("admin-bro");
const AdminBroMongoose = require("@admin-bro/mongoose");
const bcrypt = require("bcryptjs");

AdminBro.registerAdapter(AdminBroMongoose);

const applicationSettings = require("../models/ApplicationSettings");
const Admin = require("../models/admin");
const Hospital = require("../models/hospital");
const Doctors = require("../models/doctor");
const Patients = require("../models/patients");

const APISetting = require("./pages/applicationSettings/index");
const Report = require("./pages/report/index");
const {
  before: passwordHookBefore,
  after: passwordHookAfter,
} = require("./hooks/password.hooks");

// Sidebar Parents
const RegisterParent = {
  name: "Manage Users",
  icon: "Accessibility",
};

const adminBroOption = new AdminBro({
  resources: [
    {
      apiFetch: null,
      resource: Patients,
      options: {
        apiFetch: false,
        properties: {
          _id: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
        },
        actions: {
          list: { isVisible: false },
          delete: {
            isVisible: false,
          },
          new: {
            isVisible: false,
          },
          edit: {
            isVisible: false,
          },
          filter: {
            isVisible: false,
          },
          bulkDelete: {
            isVisible: false,
          },
        },
      },
    },
    {
      apiFetch: null,
      resource: applicationSettings,
      options: {
        apiFetch: false,
        properties: {
          _id: {
            isVisible: { list: false, filter: false, show: false, edit: false },
          },
        },
        actions: {
          delete: {
            isVisible: false,
          },
          new: {
            isVisible: false,
          },
          edit: {
            isVisible: false,
          },
          filter: {
            isVisible: false,
          },
          bulkDelete: {
            isVisible: false,
          },
        },
      },
    },
    {
      resource: Admin,
      options: {
        parent: RegisterParent,
        properties: {
          encryptedPassword: {
            isVisible: false,
          },
          password: {
            type: "password",
          },
        },
        actions: {
          new: {
            after: passwordHookAfter,
            before: passwordHookBefore,
          },
          edit: {
            after: passwordHookAfter,
            before: passwordHookBefore,
          },
        },
      },
    },
    {
      resource: Hospital,
      options: {
        parent: RegisterParent,
        listProperties: [
          "HospitalName",
          "email",
          "username",
          "address",
          "patients_API",
          "doctor_API",
        ],
        properties: {
          encryptedPassword: {
            isVisible: false,
          },
          isOnline: {
            isVisible: false,
          },
          lastChecked: {
            isVisible: false,
          },
          status: {
            isVisible: false,
          },
          isFetching: {
            isVisible: false,
          },
          password: {
            type: "password",
          },
        },
        actions: {
          new: {
            after: passwordHookAfter,
            before: passwordHookBefore,
          },
          edit: { isVisible: false },
        },
      },
    },
    {
      resource: Doctors,
      options: {
        parent: RegisterParent,
        listProperties: ["doctorName", "email", "address", "hospitalInfo"],
        properties: {
          encryptedPassword: {
            isVisible: false,
          },
          password: {
            type: "password",
          },
        },
        actions: {
          new: {
            after: passwordHookAfter,
            before: passwordHookBefore,
          },
          edit: {
            isVisible: false,
          },
        },
      },
    },
  ],
  pages: {
    APISetting,
    Report,
  },
  locale: {
    translations: {
      labels: {
        Admin: "Medical Portal Admin",
      },
    },
  },
  dashboard: {
    component: AdminBro.bundle("./dashboard"),
  },
  branding: {
    companyName: "Medical Portal",
  },
  rootPath: "/admin",
});

const adminBroAuthentication = {
  authenticate: (email, password) => {
    return new Promise(async (resolve) => {
      try {
        const user = await Admin.findOne({ email: email });

        if (!user) {
          return resolve(false);
        }

        const isMatch = await bcrypt.compare(password, user.encryptedPassword);
        if (isMatch) {
          resolve(user);
        }
      } catch (err) {
        resolve(false);
      }
    });
  },
  cookiePassword: "CookiePassword",
  defaultMessage: "Welcome to MedicalPortal Admin Panel",
};

const router = AdminBroExpress.buildAuthenticatedRouter(
  adminBroOption,
  adminBroAuthentication
);
module.exports = router;
