import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

const Dashboard = () => {
    return (
        <Container className="py-4">
            <Card>
                <Card.Body>
                    <h3> Dashboard</h3>
                    <Card.Text className="px-4">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Tenetur at asperiores earum officiis
                        reiciendis necessitatibus eos! Nam harum tempore
                        molestias aliquam, qui excepturi similique expedita
                        vitae perferendis voluptatum laudantium vero
                        deleniti laboriosam assumenda impedit repellendus
                        eum, commodi totam! Molestiae ducimus placeat totam
                        nesciunt, perspiciatis dolor mollitia ut saepe cum
                        sunt?
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Dashboard;