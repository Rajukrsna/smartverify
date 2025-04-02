import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import GppGoodRoundedIcon from '@mui/icons-material/GppGoodRounded';
import logo  from '../assets/logo.svg';

const items = [
  {
    icon: <VerifiedUserRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Trusted Verification',
    description:
      'Ensure authenticity with a secure and reliable verification process for sellers.',
  },
  {
    icon: <SecurityRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Secure Transactions',
    description:
      'Enhance buyer confidence by verifying sellers before transactions.',
  },
  {
    icon: <AssignmentTurnedInRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Compliance Guaranteed',
    description:
      'Meet industry standards with a seamless verification process.',
  },
  {
    icon: <GppGoodRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Fraud Prevention',
    description:
      'Reduce risks and prevent fraudulent activities with advanced verification checks.',
  },
];

export default function SellerVerificationContent() {
  return (
    <Stack
      sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}
    >
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <img src={logo} alt="Logo" style={{ width: '40%', height: 'auto' }} /> 
      </Box>
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}
