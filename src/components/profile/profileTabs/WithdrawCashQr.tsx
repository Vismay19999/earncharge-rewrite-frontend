"use client"

import React, { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { getAccessToken } from "@/utils/auth"
import { FaQrcode } from "react-icons/fa"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const WithdrawCashQR = () => {
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleWithdrawQR = async () => {
    try {
      setLoading(true)
      const accessToken = getAccessToken()

      const response = await axios.get("https://api.earncharge.in/v1/user/wallet/cashback/withdraw/qr", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      toast.success("QR code generated successfully")
      // Here you might want to handle the QR code data from the response
    } catch (error: any) {
      if (error.response?.status === 400 && error.response?.data?.message?.includes("Minimum wallet balance")) {
        toast.error("⚠️ Insufficient Balance", {
          autoClose: 4000,
          style: {
            background: "#FEF2F2",
            color: "#991B1B",
            padding: "16px",
          },
          icon: <span>₹</span>,
        })
      } else {
        toast.error(error.response?.data?.message || "Something went wrong")
      }
    } finally {
      setLoading(false)
    }
  }

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className="p-2">
      <div className='flex flex-row gap-3 items-center justify-center'>
      <p className='font-bold'>For Cashback withdraw</p>
      <Button
        onClick={openModal}
        disabled={loading}
      >
        <FaQrcode className="h-4 w-4" />
      </Button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Withdraw Cashback</DialogTitle>
            <DialogDescription>
            To withdraw the cashback, kindly click on the button below. This will take you to a new page and ask for your mobile number to fetch the UPI ID linked to that number. The cashback amount <p className="text-blue-600 font-bold"> (minimum ₹20)</p>  will be credited to your account in real-time.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button  onClick={closeModal}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                closeModal()
                handleWithdrawQR()
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default WithdrawCashQR

