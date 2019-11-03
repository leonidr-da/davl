/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { Header, Segment, Form } from 'semantic-ui-react';

export type Props = {
  loading: boolean;
  onSubmit: (fromDate: string, toDate: string) => void;
}

/**
 * React component for the view of the `MainScreen`.
 */
const RequestView: React.FC<Props> = ({onSubmit, loading}) => {
  const [firstDay, setFirstDay] = React.useState<string>('');
  const [lastDay, setLastDay] = React.useState<string>('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (firstDay === '' || lastDay === '' || firstDay > lastDay) {
      alert('Both dates need be set and the first day needs to come before the last day.');
      return;
    }
    onSubmit(firstDay, lastDay);
  }

  return (
    <Segment>
      <Header as='h2'>
        Request Vacation
      </Header>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input
            label='First Day'
            control='input'
            type='date'
            value={firstDay}
            onChange={(event) => setFirstDay(event.currentTarget.value)}
          />
          <Form.Input
            label='Last Day'
            control='input'
            type='date'
            value={lastDay}
            onChange={(event) => setLastDay(event.currentTarget.value)}
          />
          <Form.Button
            type='submit'
            content={loading ? 'Loading...' : 'Request'}
          />
        </Form.Group>
      </Form>
    </Segment>
  );
}

export default RequestView;
