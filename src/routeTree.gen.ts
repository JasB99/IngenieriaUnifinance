/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as SettingsSectionImport } from "./routes/settingsSection";
import { Route as RegisterSectionImport } from "./routes/registerSection";
import { Route as ProfileSectionImport } from "./routes/profileSection";
import { Route as LogInSectionImport } from "./routes/logInSection";
import { Route as InitialSectionImport } from "./routes/initialSection";
import { Route as IndexImport } from "./routes/index";

// Create/Update Routes

const SettingsSectionRoute = SettingsSectionImport.update({
  id: "/settingsSection",
  path: "/settingsSection",
  getParentRoute: () => rootRoute,
} as any);

const RegisterSectionRoute = RegisterSectionImport.update({
  id: "/registerSection",
  path: "/registerSection",
  getParentRoute: () => rootRoute,
} as any);

const ProfileSectionRoute = ProfileSectionImport.update({
  id: "/profileSection",
  path: "/profileSection",
  getParentRoute: () => rootRoute,
} as any);

const LogInSectionRoute = LogInSectionImport.update({
  id: "/logInSection",
  path: "/logInSection",
  getParentRoute: () => rootRoute,
} as any);

const InitialSectionRoute = InitialSectionImport.update({
  id: "/initialSection",
  path: "/initialSection",
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/initialSection": {
      id: "/initialSection";
      path: "/initialSection";
      fullPath: "/initialSection";
      preLoaderRoute: typeof InitialSectionImport;
      parentRoute: typeof rootRoute;
    };
    "/logInSection": {
      id: "/logInSection";
      path: "/logInSection";
      fullPath: "/logInSection";
      preLoaderRoute: typeof LogInSectionImport;
      parentRoute: typeof rootRoute;
    };
    "/profileSection": {
      id: "/profileSection";
      path: "/profileSection";
      fullPath: "/profileSection";
      preLoaderRoute: typeof ProfileSectionImport;
      parentRoute: typeof rootRoute;
    };
    "/registerSection": {
      id: "/registerSection";
      path: "/registerSection";
      fullPath: "/registerSection";
      preLoaderRoute: typeof RegisterSectionImport;
      parentRoute: typeof rootRoute;
    };
    "/settingsSection": {
      id: "/settingsSection";
      path: "/settingsSection";
      fullPath: "/settingsSection";
      preLoaderRoute: typeof SettingsSectionImport;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  "/": typeof IndexRoute;
  "/initialSection": typeof InitialSectionRoute;
  "/logInSection": typeof LogInSectionRoute;
  "/profileSection": typeof ProfileSectionRoute;
  "/registerSection": typeof RegisterSectionRoute;
  "/settingsSection": typeof SettingsSectionRoute;
}

export interface FileRoutesByTo {
  "/": typeof IndexRoute;
  "/initialSection": typeof InitialSectionRoute;
  "/logInSection": typeof LogInSectionRoute;
  "/profileSection": typeof ProfileSectionRoute;
  "/registerSection": typeof RegisterSectionRoute;
  "/settingsSection": typeof SettingsSectionRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexRoute;
  "/initialSection": typeof InitialSectionRoute;
  "/logInSection": typeof LogInSectionRoute;
  "/profileSection": typeof ProfileSectionRoute;
  "/registerSection": typeof RegisterSectionRoute;
  "/settingsSection": typeof SettingsSectionRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | "/"
    | "/initialSection"
    | "/logInSection"
    | "/profileSection"
    | "/registerSection"
    | "/settingsSection";
  fileRoutesByTo: FileRoutesByTo;
  to:
    | "/"
    | "/initialSection"
    | "/logInSection"
    | "/profileSection"
    | "/registerSection"
    | "/settingsSection";
  id:
    | "__root__"
    | "/"
    | "/initialSection"
    | "/logInSection"
    | "/profileSection"
    | "/registerSection"
    | "/settingsSection";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  InitialSectionRoute: typeof InitialSectionRoute;
  LogInSectionRoute: typeof LogInSectionRoute;
  ProfileSectionRoute: typeof ProfileSectionRoute;
  RegisterSectionRoute: typeof RegisterSectionRoute;
  SettingsSectionRoute: typeof SettingsSectionRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  InitialSectionRoute: InitialSectionRoute,
  LogInSectionRoute: LogInSectionRoute,
  ProfileSectionRoute: ProfileSectionRoute,
  RegisterSectionRoute: RegisterSectionRoute,
  SettingsSectionRoute: SettingsSectionRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/initialSection",
        "/logInSection",
        "/profileSection",
        "/registerSection",
        "/settingsSection"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/initialSection": {
      "filePath": "initialSection.tsx"
    },
    "/logInSection": {
      "filePath": "logInSection.tsx"
    },
    "/profileSection": {
      "filePath": "profileSection.tsx"
    },
    "/registerSection": {
      "filePath": "registerSection.tsx"
    },
    "/settingsSection": {
      "filePath": "settingsSection.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
