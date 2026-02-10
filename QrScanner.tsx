import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { X, Camera, AlertTriangle } from 'lucide-react';

interface QrScannerProps {
    onScanSuccess: (decodedText: string) => void;
    onClose: () => void;
    language: 'tr' | 'en';
}

const translations = {
    tr: {
        scanning: 'QR Kod Tarıyorum...',
        instruction: 'Kameranızı eserinin yanındaki QR koda tutun.',
        cameraError: 'Kamera erişimi sağlanamadı. Lütfen kamera iznini kontrol edin.',
        retrying: 'Tekrar deneniyor...',
        close: 'Kapat',
    },
    en: {
        scanning: 'Scanning QR Code...',
        instruction: 'Point your camera at the QR code near the artifact.',
        cameraError: 'Camera access failed. Please check camera permissions.',
        retrying: 'Retrying...',
        close: 'Close',
    }
};

export default function QrScanner({ onScanSuccess, onClose, language }: QrScannerProps) {
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const [error, setError] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const t = translations[language];

    useEffect(() => {
        const scannerId = 'qr-reader';
        let scanner: Html5Qrcode | null = null;

        const startScanner = async () => {
            try {
                scanner = new Html5Qrcode(scannerId);
                scannerRef.current = scanner;

                await scanner.start(
                    { facingMode: 'environment' }, // Use rear camera
                    {
                        fps: 10,
                        qrbox: { width: 250, height: 250 },
                    },
                    (decodedText) => {
                        // QR code scanned successfully
                        onScanSuccess(decodedText);
                        // Scanner will be stopped in cleanup
                    },
                    () => {
                        // QR code scanning failed (no QR found in frame) — ignore
                    }
                );
            } catch (err) {
                console.error('QR Scanner error:', err);
                setError(t.cameraError);
            }
        };

        startScanner();

        // Cleanup
        return () => {
            if (scannerRef.current) {
                scannerRef.current.stop().catch(() => { });
                scannerRef.current = null;
            }
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
            {/* Header */}
            <div className="relative z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent">
                <button
                    onClick={onClose}
                    className="text-white p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                >
                    <X size={24} />
                </button>
                <div className="text-emerald-400 text-sm font-bold font-mono animate-pulse flex items-center gap-2">
                    <Camera size={16} /> {t.scanning}
                </div>
            </div>

            {/* Scanner Area */}
            <div className="flex-1 flex flex-col items-center justify-center relative">
                {error ? (
                    <div className="text-center p-8 space-y-4">
                        <div className="w-16 h-16 mx-auto bg-red-900/30 rounded-full flex items-center justify-center border border-red-500/50">
                            <AlertTriangle className="text-red-400" size={32} />
                        </div>
                        <p className="text-red-400 text-sm max-w-xs">{error}</p>
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-stone-800 text-stone-300 rounded-xl border border-stone-600 hover:bg-stone-700 transition-colors text-sm font-bold"
                        >
                            {t.close}
                        </button>
                    </div>
                ) : (
                    <>
                        {/* QR Reader Container */}
                        <div
                            id="qr-reader"
                            ref={containerRef}
                            className="w-full max-w-[300px] aspect-square rounded-2xl overflow-hidden border-2 border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.15)]"
                        />

                        {/* Corner decorations */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[310px] h-[310px] pointer-events-none">
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-emerald-400 rounded-tl-lg" />
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-emerald-400 rounded-tr-lg" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-emerald-400 rounded-bl-lg" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-emerald-400 rounded-br-lg" />
                        </div>
                    </>
                )}
            </div>

            {/* Footer Instruction */}
            <div className="relative z-20 p-6 bg-gradient-to-t from-black/80 to-transparent text-center">
                <p className="text-stone-400 text-sm max-w-xs mx-auto">{t.instruction}</p>
            </div>
        </div>
    );
}
