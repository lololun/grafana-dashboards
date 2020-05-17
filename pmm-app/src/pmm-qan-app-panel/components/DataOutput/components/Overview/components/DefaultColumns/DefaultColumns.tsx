// TODO: calculate table width right and remove it
import {
  COLUMN_WIDTH,
  FIXED_COLUMN_WIDTH,
  MAIN_METRIC_MIN_WIDTH,
  ROW_NUMBER_COLUMN_WIDTH,
  TABLE_X_SCROLL,
} from '../../OverviewTable.constants';
import { mainMetric, rowNumber } from './DefaultColumns.styles';
import { GroupByControl } from '../GroupByControl/GroupByControl';
// eslint-disable-next-line max-len
import { QueryTooltip } from '../../../../../../../react-plugins-deps/components/Elements/QueryTooltip/QueryTooltip';
import React from 'react';
import './DefaultColumns.scss';
import { Icon } from 'antd';

const MAGIC_WIDTH_FIX = 17;

const getMainColumnWidth = columns => {
  return Math.max(
    TABLE_X_SCROLL -
      (columns - 1) * FIXED_COLUMN_WIDTH -
      COLUMN_WIDTH * 1.8 -
      ROW_NUMBER_COLUMN_WIDTH +
      MAGIC_WIDTH_FIX,
    MAIN_METRIC_MIN_WIDTH
  );
};

export const getDefaultColumns = (groupBy, pageNumber, pageSize, columns, onCell) => {
  const mainMetricColumnWidth = getMainColumnWidth(columns);
  // @ts-ignore
  return [
    {
      title: '#',
      dataIndex: 'rowNumber',
      key: 'rowNumber',
      fixed: 'left',
      width: ROW_NUMBER_COLUMN_WIDTH,
      render: (text, record, index) => (
        <div className={rowNumber}>{index === 0 ? '' : (pageNumber - 1) * pageSize + index}</div>
      ),
    },
    {
      dataIndex: 'mainMetric',
      fixed: 'left',
      width: mainMetricColumnWidth,
      title: () => <GroupByControl />,
      ellipsis: true,
      className: 'overview-main-column',
      onCell: onCell,
      render: (text, record, index) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={mainMetric(mainMetricColumnWidth, index === 0)}>
              {index === 0 ? 'TOTAL' : record.fingerprint || record.dimension || 'N/A'}
            </div>
            {index !== 0 && record.fingerprint ? (
              <QueryTooltip query={record.fingerprint}>
                <Icon type="question-circle" style={{ marginLeft: 'auto' }} />
              </QueryTooltip>
            ) : null}
          </div>
        );
      },
    },
  ];
};
