import { Dialog, styled } from "@mui/material";

export const ThemedDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-container': {
    backdropFilter: 'blur(0.5rem)'
  },
  '& .MuiPaper-root': {
    backgroundColor: 'var(--bgColorFirst)',
  },
  '& *:not(button)': {
      color: 'var(--fontColor)'
  }
}));