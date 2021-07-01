declare var process: {
  env: {
    NODE_ENV: string;
  };
};

import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  createStyles,
  makeStyles,
  Drawer,
  ButtonGroup,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { ContentsTitle, PaletteColors, ModesThemes } from './components';
import { Divider } from '@/ui/components';

import { useTypedSelector, useActions } from '@/hooks';
import { ITheme } from '@/types/theme';
import { Lang } from '@/types/languages';
import { IAppContext } from '@/contexts/application';
import { withAppContext } from '@/hocs';

interface Props extends IAppContext {}

export default withAppContext(
  memo(function Settingbar({ application }: Props) {
    const { settingbar, lang } = useTypedSelector((state) => state.app);
    const { appChangeLang } = useActions();
    const { i18n } = useTranslation();
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState<any>(null);

    const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const changeLanguage = (language: Lang) => {
      appChangeLang(language);
      i18n.changeLanguage(language);
    };

    function changeSettingsbar() {
      application?.bars?.changeSettingsbar(settingbar);
    }

    return (
      <Drawer
        className={classes.drawer}
        anchor={'right'}
        open={settingbar}
        onClose={changeSettingsbar}>
        <div className={classes.settingbar}>
          <ContentsTitle />

          <Divider />

          <ModesThemes />
          <Divider />

          <PaletteColors />

          <Divider />
          <div className={classes.language}>
            <ButtonGroup variant="outlined">
              <Button className={classes.btn}>
                <LanguageIcon />
                {lang.toUpperCase()}
              </Button>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}>
                <ArrowDropDownIcon />
              </Button>
            </ButtonGroup>

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}>
              <MenuItem
                onClick={() => {
                  changeLanguage('en');
                  handleClose();
                }}>
                EN
              </MenuItem>
              <MenuItem
                onClick={() => {
                  changeLanguage('ru');
                  handleClose();
                }}>
                RU
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Drawer>
    );
  }),
);

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    settingbar: {
      display: 'flex',
      flexDirection: 'column',
      width: theme.drawer.openWidth + 100,
      height: '100%',
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      transition: theme.drawer.transition,
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
    },
    language: {
      marginTop: theme.spacing(3),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',

      '& > button': {
        margin: theme.spacing(2),
      },
    },
    btn: { alignItems: 'center', justifyContent: 'center' },
    drawer: {},
  }),
);
