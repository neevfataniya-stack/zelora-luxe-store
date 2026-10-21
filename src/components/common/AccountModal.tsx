import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../data/products';
import { X, User, Package, Heart, BellRing, ArrowRight } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: string) => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const { lastOrder } = useCart();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#292522]/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FAF7F2] border border-[#ECE4D8] w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-[#292522] text-[#F5F0E8] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-[#3D3733] text-[#C5A46D]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-[#FAF7F2]">
                Client Concierge & Profile
              </h3>
              <span className="text-[11px] text-[#C5A46D] tracking-wider uppercase">
                Demo Account Access
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#F5F0E8]/70 hover:text-[#F5F0E8] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-[#ECE4D8] bg-[#F5F0E8]">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 text-xs uppercase tracking-wider font-medium text-center transition-colors ${
              activeTab === 'profile'
                ? 'bg-[#FAF7F2] text-[#641E32] border-b-2 border-[#641E32]'
                : 'text-[#665E58] hover:text-[#292522]'
            }`}
          >
            Client Profile
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-3 text-xs uppercase tracking-wider font-medium text-center transition-colors ${
              activeTab === 'orders'
                ? 'bg-[#FAF7F2] text-[#641E32] border-b-2 border-[#641E32]'
                : 'text-[#665E58] hover:text-[#292522]'
            }`}
          >
            Simulated Orders {lastOrder ? '(1)' : '(0)'}
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {activeTab === 'profile' ? (
            <div className="space-y-4">
              <div className="bg-[#F5F0E8] p-4 border border-[#ECE4D8]">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] tracking-wider uppercase text-[#8C827A] block">
                      Signed-in As Guest
                    </span>
                    <h4 className="font-serif text-base font-medium text-[#292522]">
                      Distinguished Client
                    </h4>
                    <p className="text-xs text-[#665E58] mt-0.5">
                      neevfataniya@gmail.com
                    </p>
                  </div>
                  <span className="text-[10px] uppercase font-semibold text-[#641E32] bg-[#FAF7F2] px-2 py-0.5 border border-[#ECE4D8]">
                    Member Tier
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#665E58]">
                <div className="flex items-center gap-2 p-2 hover:bg-[#F5F0E8] transition-colors">
                  <Package className="w-4 h-4 text-[#C5A46D]" />
                  <span>Complimentary insured shipping eligibility: Active</span>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-[#F5F0E8] transition-colors">
                  <Heart className="w-4 h-4 text-[#C5A46D]" />
                  <span>Personalized Jewellery Curation: Enabled</span>
                </div>
                <div className="flex items-center gap-2 p-2 hover:bg-[#F5F0E8] transition-colors">
                  <BellRing className="w-4 h-4 text-[#C5A46D]" />
                  <span>Private Collection Previews: Subscribed</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onNavigate('/shop');
                  }}
                  className="w-full py-3 bg-[#641E32] hover:bg-[#4A1424] text-[#F5F0E8] text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-2"
                >
                  Explore Collection <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {lastOrder ? (
                <div className="bg-[#F5F0E8] p-4 border border-[#ECE4D8] space-y-3">
                  <div className="flex justify-between items-start pb-2 border-b border-[#ECE4D8]">
                    <div>
                      <span className="text-[10px] uppercase text-[#8C827A] block">
                        Order Reference
                      </span>
                      <span className="font-mono text-xs font-semibold text-[#292522]">
                        {lastOrder.orderId}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider bg-[#641E32] text-[#F5F0E8] px-2 py-0.5">
                      Sample Confirmed
                    </span>
                  </div>

                  <div className="text-xs space-y-1">
                    <p className="text-[#665E58]">Date: {lastOrder.orderDate}</p>
                    <p className="text-[#665E58]">Items: {lastOrder.items.length} pieces</p>
                    <p className="font-semibold text-[#292522]">
                      Total: {formatINR(lastOrder.total)}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onNavigate('/confirmation');
                    }}
                    className="w-full py-2 bg-[#292522] text-[#F5F0E8] text-xs uppercase tracking-wider font-medium hover:bg-[#3D3733] transition-colors"
                  >
                    View Order Details
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package className="w-10 h-10 text-[#C5A46D] mx-auto mb-2 opacity-70" />
                  <p className="font-serif text-sm text-[#292522]">
                    No simulated orders found yet
                  </p>
                  <p className="text-xs text-[#8C827A] mt-1">
                    Add pieces from our 40-product catalogue and proceed through checkout to test the confirmation flow.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
