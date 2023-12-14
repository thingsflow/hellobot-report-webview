import * as React from 'react';
import { t } from '@/utils/translate';

const StartButton = () => {
  return (
    <div className="fixed bottom-0 w-full p-4 bg-white">
      <div className="flex items-center justify-center font-bold h-12 bg-[#FFE967] rounded-[26px] cursor-pointer">
        {t('bridge_relationshipmap_screen_button_start')}
      </div>
    </div>
  );
};

export default StartButton;
