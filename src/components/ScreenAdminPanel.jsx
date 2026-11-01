import React from 'react';
import NowNineAdminDashboard from './NowNineAdminDashboard';

export default function ScreenAdminPanel({ 
  onBack, 
  onNavigate = () => {}, 
  currentLocation = null 
}) {
  return (
    <NowNineAdminDashboard 
      onClose={onBack}
      onSwitchToMobile={onBack}
      currentLocation={currentLocation}
    />
  );
}
