import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { createStyles, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import { Card, Enumeration } from '@/components';
import { Typography, IconButton, Button } from '@/ui/components';
import { CreateIcon } from '@/assets/icons';
import { ITheme } from '@/types/theme';

interface Props {
  route: any;
  className: string;
}

export default memo(function TabInfo({ route, className }: Props) {
  const { t } = useTranslation();

  const cards = ['resume', 'usb', 'equipment', 'main'];
  const agentActions: { label: string }[] = t(`devices:info.agent.actions`, {
    returnObjects: true,
  });
  const classes = useStyles();
  return (
    <div className={clsx(classes.container, className)}>
      {cards.map((card) => {
        const list: { label: string }[] = t(`devices:info.${card}.list`, {
          returnObjects: true,
        });
        const items = Array.isArray(list)
          ? list.map((item, idx) => {
              return { key: item.label, value: String(idx + 1) };
            })
          : [];
        const header = (
          <>
            <Typography variant="h4">{t(`devices:info.${card}.title`)}</Typography>
            {card === 'resume' && (
              <IconButton className={classes.icon} size="small">
                <CreateIcon />
              </IconButton>
            )}
          </>
        );
        const body = <Enumeration items={items} />;
        return <Card key={card} header={header} body={body} />;
      })}
      <Card
        header={<Typography variant="h4">{t(`devices:info.agent.title`)}</Typography>}
        footer={
          Array.isArray(agentActions)
            ? agentActions.map((action) => (
                <Button className={classes.btn} fullWidth key={action.label}>
                  {action.label}
                </Button>
              ))
            : null
        }
      />
    </div>
  );
});

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    container: {
      gridTemplateColumns: `1fr 1fr`,
      gridAutoRows: `max-content`,
      paddingTop: theme.spacing(1.5),
    },
    icon: { marginLeft: 'auto' },
    btn: { marginRight: theme.spacing(2), '&:last-child': { marginRight: 0 } },
  }),
);
