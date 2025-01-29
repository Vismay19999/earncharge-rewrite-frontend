"use client"

import React, { useEffect, useState } from "react"
import { getAccessToken } from "@/utils/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


interface QRCodeData {
  id: string
  s_no: string
  vCode: string
  qr_link: string
  used: boolean
  assinged: boolean
  createdAt: string
  userDataId: string
}

const QRAssigned = () => {
  const [qrCodes, setQRCodes] = useState<QRCodeData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQRCodes = async () => {
      try {
        const token = getAccessToken()
        const response = await fetch("https://api.earncharge.in/v1/user/qr/assigned", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const data = await response.json()
        setQRCodes(data.data)
      } catch (error) {
        console.error("Error fetching QR codes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchQRCodes()
  }, [])

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {qrCodes.map((qrCode) => (
          <Card key={qrCode.id} className="w-full">
            <CardHeader>
              <CardTitle>QR Code</CardTitle>
            </CardHeader>
            <CardContent>
              <a
                href={qrCode.qr_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex items-center gap-2 break-all"
              >
                Click on the link to claim cashback
              </a>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">vCode:</span> {qrCode.vCode}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Created:</span> {new Date(qrCode.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Status:</span> {qrCode.used ? "Used" : "Available"}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default QRAssigned

