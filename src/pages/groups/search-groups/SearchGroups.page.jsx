import { useNavigate } from "react-router-dom";

import { Card, CardHeader, Container, Row, Spinner } from "reactstrap";

import { useAppSelector } from "redux/app";
import { selectAllGroupsData, selectGroupState } from "redux/features";

import { BoxHeader } from "components/headers";
import { ReactTable } from "components/widgets";

import { GROUP_DETAILS } from "..";

import { groupsTableColumns } from ".";

export const SearchGroupsPage = () => {
  const navigate = useNavigate();

  const groupState = useAppSelector(selectGroupState);
  const groups = useAppSelector(selectAllGroupsData);

  const onViewGroupDetails = e => {
    const { id } = e.target;
    navigate(`/admin${GROUP_DETAILS}/${id}`);
  };

  const onDeleteGroup = e => {
    const { id } = e.target;
    console.log("delete group", id);
  };

  return (
    <>
      <BoxHeader />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <h3 className="mb-0">Groups</h3>
                <p className="text-sm mb-0">Groups</p>
              </CardHeader>
              {groupState.isLoading ? (
                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <Spinner />
                </div>
              ) : (
                <ReactTable
                  data={groups}
                  columns={groupsTableColumns({
                    onDetailsButtonClick: onViewGroupDetails,
                    onRemoveButtonClick: onDeleteGroup,
                  })}
                />
              )}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};
