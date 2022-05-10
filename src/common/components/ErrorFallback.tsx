import { css, Global } from '@emotion/react';
import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

// use div instead of box: https://github.com/mui/material-ui/issues/31835
export function ErrorFallback() {
  const { t } = useTranslation('common');

  return (
    <div
      css={css({
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      })}
    >
      <Global
        styles={{
          html: {
            height: '100%',
          },
          body: {
            height: '100%',
          },
          '#root': {
            height: '100%',
          },
        }}
      />
      <div
        css={css({
          textAlign: 'center',
        })}
      >
        <Typography variant="h3">{t('errorFallback.message')}</Typography>
        <Button
          variant="contained"
          sx={{ mt: 4 }}
          size="large"
          onClick={() => window.location.assign(window.location.origin)}
        >
          {t('errorFallback.refresh')}
        </Button>
      </div>
    </div>
  );
}
