import React from 'react';
import styled from 'styled-components';

const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const TableTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: #495057;
  border-bottom: 2px solid #e9ecef;
  background-color: #f8f9fa;
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #e9ecef;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f8f9fa;
  }
`;

const PlaceCell = styled(TableCell)`
  font-weight: 600;
  color: #007bff;
  width: 60px;
`;

const PointsCell = styled(TableCell)`
  font-weight: 600;
  color: #28a745;
  text-align: right;
`;

const ActionIcon = styled.button`
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: #007bff;
    background-color: #f8f9fa;
  }
`;

interface RatingItem {
  place: number;
  name: string;
  points: number;
}

interface RatingTableProps {
  title: string;
  data: RatingItem[];
  showActions?: boolean;
}

const RatingTable: React.FC<RatingTableProps> = ({ title, data, showActions = false }) => {
  return (
    <TableContainer>
      <TableTitle>{title}</TableTitle>
      <Table>
        <thead>
          <tr>
            <TableHeader>Место</TableHeader>
            <TableHeader>{title.includes('групп') ? 'Название группы' : 'Имя ученика'}</TableHeader>
            <TableHeader>Количество баллов</TableHeader>
            {showActions && <TableHeader>Действия</TableHeader>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <PlaceCell>{item.place}</PlaceCell>
              <TableCell>{item.name}</TableCell>
              <PointsCell>{item.points}</PointsCell>
              {showActions && (
                <TableCell>
                  <ActionIcon>⋯</ActionIcon>
                </TableCell>
              )}
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default RatingTable;
