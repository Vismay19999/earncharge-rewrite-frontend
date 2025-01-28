import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MpinInput } from './MpinInput';
import { useMpin } from '@/hooks/useMpin';

interface ResetMpinFormProps {
  onSuccess?: () => void;
}

export const ResetMpinForm: React.FC<ResetMpinFormProps> = ({
  onSuccess
}) => {
  const [oldMpin, setOldMpin] = useState('');
  const [newMpin, setNewMpin] = useState('');
  const [confirmMpin, setConfirmMpin] = useState('');
  const { loading, error, resetMpin } = useMpin();
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setValidationError(null);

    if (newMpin !== confirmMpin) {
      setValidationError("New MPIN and confirmation don't match");
      return;
    }

    const success = await resetMpin(oldMpin, newMpin);
    if (success) {
      onSuccess?.();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Current MPIN</label>
          <MpinInput
            value={oldMpin}
            onChange={setOldMpin}
          />
        </div>

        <div>
          <label className="text-sm font-medium">New MPIN</label>
          <MpinInput
            value={newMpin}
            onChange={setNewMpin}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Confirm New MPIN</label>
          <MpinInput
            value={confirmMpin}
            onChange={setConfirmMpin}
            error={validationError || undefined}
          />
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <Button
        onClick={handleSubmit}
        disabled={loading || !oldMpin || !newMpin || !confirmMpin}
        className="w-full"
      >
        {loading ? 'Updating...' : 'Reset MPIN'}
      </Button>
    </div>
  );
};