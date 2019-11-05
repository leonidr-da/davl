import React from 'react';
import VacationListSegment from '../../components/VacationListSegment';
import { useDispatch, useSelector } from 'react-redux';
import { loadAll, approveRequest } from './bossViewReducer';
import { RootState } from '../../app/rootReducer';
import { Vacation } from '../../utils/vacation';
import { ContractId } from '../../ledger/Types';
import { VacationRequest } from '../../daml/DAVL';
import { Segment } from 'semantic-ui-react';
import Staff from './Staff';

const BossView: React.FC = () => {
  const dispatch = useDispatch();
  React.useEffect(() => { dispatch(loadAll()); }, [dispatch]);

  const requests = useSelector((state: RootState) => state.bossView.requests);
  const vacations = useSelector((state: RootState) => state.bossView.vacations);

  const handleApproveRequest = (vacation: Vacation) =>
    dispatch(approveRequest(new ContractId<VacationRequest>(vacation.contractId)));

  return (
    <Segment.Group>
      <Staff />
      <VacationListSegment
        header='Pending Vacation Approvals'
        viewer='boss'
        vacations={requests}
        onClickVacation={handleApproveRequest}
        icon='check'
      />
      <VacationListSegment
        header='Upcoming Vacations'
        viewer='boss'
        vacations={vacations.upcoming}
        onClickVacation={() => {}}
        icon='info'
      />
      <VacationListSegment
        header='Past Vacations'
        viewer='boss'
        vacations={vacations.past}
        onClickVacation={() => {}}
        icon='info'
      />
    </Segment.Group>
  );
}

export default BossView;
