import { Card, CardBody, CardHeader, Container, Row } from "reactstrap";

import { BoxHeader } from "components/headers";

export const CategoriesPage = () => {
  return (
    <>
      <BoxHeader />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <h3 className="mb-0">Categories Page</h3>
              </CardHeader>
              <CardBody />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};
