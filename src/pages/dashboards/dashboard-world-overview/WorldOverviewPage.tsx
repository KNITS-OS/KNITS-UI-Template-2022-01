/*!

=========================================================
* Argon Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useEffect, useState } from "react";
import { VectorMap } from "react-jvectormap";
import { useDispatch } from "react-redux";

import { Card, CardBody, Container, Row, Col, CardTitle } from "reactstrap";

import { useAppSelector } from "redux/app";
import {
  fetchActiveMembersReport,
  fetchAutoOffboardedMembersReport,
  fetchNewMembersReport,
  fetchSelfResignedMembersReport,
  selectActiveMembersReportsData,
  selectAutoOffboardedMembersReportsData,
  selectNewMembersReportsData,
  selectSelfResignedMembersReportsData,
} from "redux/features";

import { MapsHeader } from "components/headers";

import { WorldDataReport } from "types";

interface ActiveMap {
  id: "activeMembersMap" | "newMembersMap" | "selfResignedMembersMap" | "autoOffboardedMembersMap";
  value: WorldDataReport;
}

export const WorldOverviewPage = () => {
  const dispatch = useDispatch();
  // const activeMap = useAppSelector(selectCurrentMapData);

  const [activeMap, setActiveMap] = useState<ActiveMap | null>(null);

  const activeMembersMap = useAppSelector(selectActiveMembersReportsData);
  const newMembersMap = useAppSelector(selectNewMembersReportsData);
  const selfResignedMembersMap = useAppSelector(selectSelfResignedMembersReportsData);
  const autoOffboardedMembersMap = useAppSelector(selectAutoOffboardedMembersReportsData);

  const [activeMembers, setActiveMembers] = useState<number>(0);
  const [newMembers, setNewMembers] = useState<number>(0);
  const [selfResignedMembers, setSelfResignedMembers] = useState<number>(0);
  const [autoOffboardedMembers, setAutoOffboardedMembers] = useState<number>(0);

  const resetCards = () => {
    // reset all the cards
    setActiveMembers(0);
    setNewMembers(0);
    setSelfResignedMembers(0);
    setAutoOffboardedMembers(0);
  };

  const onActiveMembersClick = () => {
    setActiveMap({ id: "activeMembersMap", value: activeMembersMap });
    resetCards();
  };

  const onNewMembersClick = () => {
    setActiveMap({ id: "newMembersMap", value: newMembersMap });
    resetCards();
  };

  const onSelfResignedClick = () => {
    setActiveMap({ id: "selfResignedMembersMap", value: selfResignedMembersMap });
    resetCards();
  };

  const onAutoOffboardedClick = () => {
    setActiveMap({ id: "autoOffboardedMembersMap", value: autoOffboardedMembersMap });
    resetCards();
  };

  useEffect(() => {
    dispatch(fetchActiveMembersReport());
    dispatch(fetchNewMembersReport());
    dispatch(fetchSelfResignedMembersReport());
    dispatch(fetchAutoOffboardedMembersReport());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // jvectormap creates a new div that has a class of "jvectormap-tip" each time user hovers over a country
  // that causes the page to be longer than it should be. This function removes the extra divs.
  setTimeout(() => {
    Array.from(document.getElementsByClassName("jvectormap-tip")).forEach(el => {
      el.remove();
    });
  }, 100);

  return (
    <>
      <MapsHeader
        name="World view"
        onActiveMembersClick={onActiveMembersClick}
        onNewMembersClick={onNewMembersClick}
        onSelfResignedClick={onSelfResignedClick}
        onAutoOffboardedClick={onAutoOffboardedClick}
      />

      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardBody className="pt-0">
                <VectorMap
                  containerClassName="vector-map"
                  containerStyle={{
                    width: "100%",
                    height: "600px",
                  }}
                  map={"world_mill"}
                  zoomOnScroll={true}
                  scaleColors={["#f00", "#0071A4"]}
                  normalizeFunction="polynomial"
                  hoverOpacity={0.7}
                  hoverColor={false}
                  backgroundColor="transparent"
                  regionStyle={{
                    initial: {
                      fill: "#e9ecef",
                      "fill-opacity": 0.8,
                      stroke: "none",
                      "stroke-width": 0,
                      "stroke-opacity": 1,
                    },
                    hover: {
                      fill: "#dee2e6",
                      "fill-opacity": 0.8,
                      cursor: "pointer",
                    },
                  }}
                  series={{
                    regions: [
                      {
                        values: activeMap?.value,
                        scale: ["#ced4da", "#043c7c"],
                        normalizeFunction: "polynomial",
                      },
                    ],
                  }}
                  onRegionTipShow={function name(e: any, label: any, code: string) {
                    if (activeMap !== null) {
                      if (activeMap.id === "activeMembersMap") {
                        activeMembersMap[code] !== undefined
                          ? setActiveMembers(activeMembersMap[code])
                          : setActiveMembers(0);
                      } else if (activeMap.id === "newMembersMap") {
                        newMembersMap[code] !== undefined
                          ? setNewMembers(newMembersMap[code])
                          : setNewMembers(0);
                      } else if (activeMap.id === "selfResignedMembersMap") {
                        selfResignedMembersMap[code] !== undefined
                          ? setSelfResignedMembers(selfResignedMembersMap[code])
                          : setSelfResignedMembers(0);
                      } else if (activeMap.id === "autoOffboardedMembersMap") {
                        autoOffboardedMembersMap[code] !== undefined
                          ? setAutoOffboardedMembers(autoOffboardedMembersMap[code])
                          : setAutoOffboardedMembers(0);
                      }
                    }
                  }}
                />
                <Row>
                  <Col md="6" xl="3">
                    <Card className="card-stats">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                              Active members
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">{activeMembers}</span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                              <i className="fas fa-user-graduate"></i>
                            </div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-sm">
                          <span className="text-success mr-2">
                            <i className="fa fa-arrow-up" /> {activeMembers / 20}
                          </span>{" "}
                          <span className="text-nowrap">Since last year</span>
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="6" xl="3">
                    <Card className="card-stats">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                              New Members
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0"> {newMembers}</span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                              <i className="fa fa-solid fa-user-plus"></i>
                            </div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-sm">
                          <span className="text-success mr-2">
                            <i className="fa fa-arrow-up" /> {newMembers / 10}
                          </span>{" "}
                          <span className="text-nowrap">Since last year</span>
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="6" xl="3">
                    <Card className="card-stats">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                              Self Resigned
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">{selfResignedMembers}</span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                              <i className="fas fa-solid fa-user-minus"></i>
                            </div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-sm">
                          <span className="text-danger mr-2">
                            <i className="fa fa-arrow-up" /> {selfResignedMembers / 20}
                          </span>{" "}
                          <span className="text-nowrap">Since last year</span>
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="6" xl="3">
                    <Card className="card-stats">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                              Auto Offboarded
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                              {autoOffboardedMembers}
                            </span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                              <i className="fas fa-sign-out-alt"></i>
                            </div>
                          </Col>
                        </Row>
                        <p className="mt-3 mb-0 text-sm">
                          <span className="text-danger mr-2">
                            <i className="fa fa-arrow-up" /> {autoOffboardedMembers / 20}
                          </span>{" "}
                          <span className="text-nowrap">Since last year</span>
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};
