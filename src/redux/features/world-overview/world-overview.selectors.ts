import { createSelector } from "reselect";

import { RootState } from "redux/app";

import { WorldOverviewCachedReports } from "types";
import {
  NO_REPORT_CACHED,
  REPORT_KEY_ACTIVE_MEMBERS,
  REPORT_KEY_AUTO_OFFBOARDED_MEMBERS,
  REPORT_KEY_CURRENT_MAP,
  REPORT_KEY_NEW_MEMBERS,
  REPORT_KEY_SELF_RESIGNED_MEMBERS,
} from "variables/app.consts";

export const selectWorldOverviewCachedReportsState = (rootState: RootState) =>
  rootState.worldOverview;

const selectAllReportsData = createSelector(
  [selectWorldOverviewCachedReportsState],
  worldOverview => worldOverview.entities
);

const findReportInCache = (allReports: WorldOverviewCachedReports[], cacheKey: string) => {
  const reportsData = allReports.find(report => report.reportName === cacheKey);
  return reportsData ? reportsData.data : NO_REPORT_CACHED;
};

export const selectActiveMembersReportsData = createSelector([selectAllReportsData], allReports =>
  findReportInCache(allReports, REPORT_KEY_ACTIVE_MEMBERS)
);

export const selectNewMembersReportsData = createSelector([selectAllReportsData], allReports =>
  findReportInCache(allReports, REPORT_KEY_NEW_MEMBERS)
);

export const selectSelfResignedMembersReportsData = createSelector(
  [selectAllReportsData],
  allReports => findReportInCache(allReports, REPORT_KEY_SELF_RESIGNED_MEMBERS)
);

export const selectAutoOffboardedMembersReportsData = createSelector(
  [selectAllReportsData],
  allReports => findReportInCache(allReports, REPORT_KEY_AUTO_OFFBOARDED_MEMBERS)
);

export const selectCurrentMapData = createSelector([selectAllReportsData], allReports =>
  findReportInCache(allReports, REPORT_KEY_CURRENT_MAP)
);
