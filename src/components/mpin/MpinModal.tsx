import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import { MpinInput } from "./MpinInput"
import { useMpin } from "@/hooks/useMpin"

interface MpinModalProps {
  onSuccess?: () => void
  phoneNumber: string
  MPINvalue: boolean
}

export const MpinModal: React.FC<MpinModalProps> = ({ onSuccess, phoneNumber, MPINvalue }) => {
  const [isOpen, setIsOpen] = useState(true)
  const [mpin, setMpin] = useState("")
  const [oldMpin, setOldMpin] = useState("")
  const [newMpin, setNewMpin] = useState("")
  const [isResetting, setIsResetting] = useState(false)
  const { loading, error, validateMpin, setNewMpin: setNewMpinHook, resetMpin } = useMpin()

  useEffect(() => {
    setIsOpen(true)
  }, [])

  const handleSubmit = async () => {
    if (mpin.length === 4) {
      let success
      if (MPINvalue) {
        success = await validateMpin(phoneNumber, mpin)
      } else {
        success = await setNewMpinHook(mpin)
      }
      if (success) {
        console.log("Done")
        setIsOpen(false)
        onSuccess?.()
      }
    }
  }

  const handleReset = async () => {
    if (oldMpin.length === 4 && newMpin.length === 4) {
      const success = await resetMpin(oldMpin, newMpin)
      if (success) {
        setIsResetting(false)
        setOldMpin("")
        setNewMpin("")
        setMpin("")
      }
    }
  }

  const renderContent = () => {
    if (isResetting) {
      return (
        <>
          <h2 className="text-lg font-semibold">Reset Your MPIN</h2>
          <p className="text-sm text-gray-500 mt-1">Please enter your old MPIN and set a new one</p>
          <div className="w-full max-w-xs space-y-4 mt-4">
            <div>
              <label htmlFor="oldMpin" className="block text-sm font-medium text-gray-700 mb-1">
                Old MPIN
              </label>
              <MpinInput id="oldMpin" value={oldMpin} onChange={setOldMpin} error={error || undefined} />
            </div>
            <div>
              <label htmlFor="newMpin" className="block text-sm font-medium text-gray-700 mb-1">
                New MPIN
              </label>
              <MpinInput value={newMpin} onChange={setNewMpin} error={error || undefined} />
            </div>
            <Button
              onClick={handleReset}
              disabled={loading || oldMpin.length !== 4 || newMpin.length !== 4}
              className="w-full"
            >
              {loading ? "Resetting..." : "Reset MPIN"}
            </Button>
            <Button onClick={() => setIsResetting(false)} variant="outline" className="w-full">
              Cancel
            </Button>
          </div>
        </>
      )
    }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto space-y-6 text-center">
      <h2 className="text-2xl font-semibold">{MPINvalue ? "Validate Your MPIN" : "Set New MPIN"}</h2>
      <p className="text-sm text-gray-500">
        {MPINvalue ? "Please enter your 4-digit MPIN to continue" : "Create a new 4-digit MPIN for secure access"}
      </p>
      <div className="w-full">
        <MpinInput value={mpin} onChange={setMpin} error={error || undefined} />
      </div>
      {!MPINvalue && (
        <p className="text-sm text-gray-600">
          Your new MPIN will be used for secure access to your account. Please remember it and do not share with anyone.
        </p>
      )}
      <div className="w-full space-y-4">
        <Button onClick={handleSubmit} disabled={loading || mpin.length !== 4} className="w-full">
          {loading ? "Processing..." : MPINvalue ? "Validate" : "Set MPIN"}
        </Button>
        {MPINvalue && (
          <Button  onClick={() => setIsResetting(true)}  variant="outline" className="w-full">
            Reset MPIN
          </Button>
        )}
      </div>
    </div>
  )
  }

  return (
    <Dialog open={isOpen} onOpenChange={undefined}>
      <DialogContent className="sm:max-w-md">
        <div className="flex flex-col items-center space-y-6 py-6">
          <div className="rounded-full bg-blue-100 p-3">
            <Lock className="h-6 w-6 text-blue-600" />
          </div>

          <div className="text-center w-full">{renderContent()}</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

