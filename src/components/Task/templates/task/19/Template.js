import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core';

import { Section, Text, Title, List, ListItem } from '../../components';
import { useTranslationTemplates, renderList, arrayItems } from '../../lib';
import dependencies from '../../../dependencies';

const { transformTimestamp } = dependencies.date;
const { DeviceIcon } = dependencies.icon;

const HARDCODE = [
  'Bully',
  'Reaver',
  'WiFi-autopwner',
  'Pixie Dust',
  'HT-WPS BREAKER',
  'Dumpper',
];

export default ({ data }) => {
  const classes = useStyles();

  const { getTitle, getText, getListItem } = useTranslationTemplates({
    number: data.type,
  });

  const list1 = (i) =>
    renderList({
      variant: getListItem,
      variables: {
        time: `${data.body.time}c`,
        fulltime: transformTimestamp(data.body.fulltime),
      },
      quantity: 3,
      i,
    });

  const list2 = (i) => (
    <>
      {renderList({
        variant: getListItem,
        quantity: 6,
        i,
      })}
      <List>
        {arrayItems(6).map((j) => (
          <ListItem key={j}>{getListItem(i, j)}</ListItem>
        ))}
      </List>
      <List>
        {HARDCODE.map((item) => (
          <ListItem key={item} className={classes.dots}>
            {item}
          </ListItem>
        ))}
      </List>
    </>
  );

  const text3 = (i) => (
    <Text>
      {getText(i)} <DeviceIcon type={data.entityType} />
      <Link
        className={classes.link}
        to={`/devices/${data?.deviceInfo?.entityType === 1 ? 'local' : 'wifi'}/${
          data?.deviceInfo?.entityId
        }/information`}>
        {data.name || ''}
      </Link>
    </Text>
  );

  const renderSection = (i) => {
    return (
      <Section key={i}>
        <Title>{getTitle(i)}</Title>
        {i === 1 && list1(i)}
        {i === 2 && list2(i)}
        {i === 3 && text3(i)}
      </Section>
    );
  };

  return (
    <>
      {renderSection(1)}
      {renderSection(2)}
    </>
  );
  // return [1, 2, 3].map(renderSection);
};

const useStyles = makeStyles((theme) => ({
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
    transition: 'all 0.3s',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
  dots: {
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(1),
  },
}));
