"use client";

import { useEffect, useState } from "react";
import { getAccessToken } from "@/utils/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Calendar, Link, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QRCodeData {
  id: string;
  s_no: string;
  vCode: string;
  qr_link: string;
  used: boolean;
  assinged: boolean;
  createdAt: string;
  userDataId: string;
}

const QRAssigned = () => {
  const [qrCodes, setQRCodes] = useState<QRCodeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQRCodes = async () => {
      try {
        const token = getAccessToken();
        const response = await fetch(
          "https://api.earncharge.in/v1/user/qr/assigned",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        const data = await response.json();
        if (data && data.data) {
          setQRCodes(data.data);
        }
      } catch (error) {
        console.error("Error fetching QR codes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQRCodes();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          loading..
        </div>
      ) : qrCodes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {qrCodes.map((qrCode) => (
            <Card
              key={qrCode.id}
              className="w-full hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  QR Code: {qrCode.vCode}
                </CardTitle>
                <QrCode className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link
                    href={qrCode.qr_link}
                    target="_blank"
                    className="text-primary text-blue-700 hover:text-primary/80 flex items-center gap-2 text-sm font-medium"
                  >
                    <Link className="h-4 w-4" />
                    Claim Cashback
                  </Link>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    Created: {new Date(qrCode.createdAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm">
                    {qrCode.used ? (
                      <XCircle className="h-4 w-4 mr-2 text-destructive" />
                    ) : (
                      <CheckCircle className="h-4 w-4 mr-2 text-success" />
                    )}
                    Status: {qrCode.used ? "Used" : "Available"}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="bg-gray-100 p-4 rounded-full mb-4">
            <QrCode className="h-8 w-8 text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No QR Codes Available</h3>
          <p className="text-gray-500 text-center mb-6">You don't have any QR codes assigned yet. Claim them from withdraw section.</p>
        </div>
      )}
    </div>
  );
};

export default QRAssigned;
