import React from 'react';
import { Button, Card, CardContent, CardDescription, CardHeader, CardMeta, Icon, Image } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activity: Activity;
    cancelSelectActivity: () => void;
}

export default function ActivityDetails({ activity, cancelSelectActivity }: Props) {
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <CardContent>
                <CardHeader>{activity.title}</CardHeader>
                <CardMeta>
                    <span className="date">{activity.date}</span>
                </CardMeta>
                <CardDescription>{activity.description}</CardDescription>
            </CardContent>
            <CardContent extra>
                <Button.Group widths={2}>
                    <Button basic color='blue' content='Edit'></Button>
                    <Button onClick={cancelSelectActivity} basic color='red' content='Cancel'></Button>
                </Button.Group>
            </CardContent>
        </Card>
    );
}
