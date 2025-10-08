"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useDepositToWallet, useWithdrawFromWallet, useTransferToUser } from "@/apis/queries/wallet.queries";
import { IWallet } from "@/utils/types/wallet.types";

interface WalletActionsProps {
  wallet: IWallet | null;
}

const WalletActions: React.FC<WalletActionsProps> = ({ wallet }) => {
  const t = useTranslations();
  const { currency } = useAuth();
  const { toast } = useToast();
  
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [transferUserId, setTransferUserId] = useState("");
  const [description, setDescription] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const depositMutation = useDepositToWallet();
  const withdrawMutation = useWithdrawFromWallet();
  const transferMutation = useTransferToUser();

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: t("invalid_amount"),
        description: t("please_enter_valid_amount"),
        variant: "danger",
      });
      return;
    }

    setIsProcessing(true);
    try {
      await depositMutation.mutateAsync({
        amount: parseFloat(amount),
        paymentMethod: "STRIPE", // Default to Stripe for now
      });
      
      toast({
        title: t("deposit_successful"),
        description: t("funds_added_to_wallet"),
        variant: "success",
      });
      
      setAmount("");
      setActiveAction(null);
    } catch (error) {
      toast({
        title: t("deposit_failed"),
        description: t("unable_to_add_funds"),
        variant: "danger",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleWithdraw = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: t("invalid_amount"),
        description: t("please_enter_valid_amount"),
        variant: "danger",
      });
      return;
    }

    if (wallet && parseFloat(amount) > wallet.balance) {
      toast({
        title: t("insufficient_balance"),
        description: t("amount_exceeds_wallet_balance"),
        variant: "danger",
      });
      return;
    }

    setIsProcessing(true);
    try {
      await withdrawMutation.mutateAsync({
        amount: parseFloat(amount),
        withdrawalMethod: "BANK_TRANSFER",
      });
      
      toast({
        title: t("withdrawal_successful"),
        description: t("withdrawal_request_submitted"),
        variant: "success",
      });
      
      setAmount("");
      setActiveAction(null);
    } catch (error) {
      toast({
        title: t("withdrawal_failed"),
        description: t("unable_to_process_withdrawal"),
        variant: "danger",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleTransfer = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: t("invalid_amount"),
        description: t("please_enter_valid_amount"),
        variant: "danger",
      });
      return;
    }

    if (!transferUserId) {
      toast({
        title: t("invalid_user"),
        description: t("please_enter_user_id"),
        variant: "danger",
      });
      return;
    }

    if (wallet && parseFloat(amount) > wallet.balance) {
      toast({
        title: t("insufficient_balance"),
        description: t("amount_exceeds_wallet_balance"),
        variant: "danger",
      });
      return;
    }

    setIsProcessing(true);
    try {
      await transferMutation.mutateAsync({
        toUserId: parseInt(transferUserId),
        amount: parseFloat(amount),
        description: description || undefined,
      });
      
      toast({
        title: t("transfer_successful"),
        description: t("funds_transferred_successfully"),
        variant: "success",
      });
      
      setAmount("");
      setTransferUserId("");
      setDescription("");
      setActiveAction(null);
    } catch (error) {
      toast({
        title: t("transfer_failed"),
        description: t("unable_to_transfer_funds"),
        variant: "danger",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setAmount("");
    setTransferUserId("");
    setDescription("");
    setActiveAction(null);
  };

  return (
    <div className="wallet_actions">
      <div className="action_buttons">
        <Button
          onClick={() => setActiveAction("deposit")}
          className="action_btn deposit_btn"
          disabled={isProcessing}
        >
          <span className="btn_icon">💰</span>
          {t("deposit")}
        </Button>
        
        <Button
          onClick={() => setActiveAction("withdraw")}
          className="action_btn withdraw_btn"
          disabled={isProcessing || !wallet || wallet.balance <= 0}
        >
          <span className="btn_icon">💸</span>
          {t("withdraw")}
        </Button>
        
        <Button
          onClick={() => setActiveAction("transfer")}
          className="action_btn transfer_btn"
          disabled={isProcessing || !wallet || wallet.balance <= 0}
        >
          <span className="btn_icon">↔️</span>
          {t("transfer")}
        </Button>
      </div>

      {activeAction && (
        <div className="action_form">
          <div className="form_header">
            <h4>{t(`${activeAction}_funds`)}</h4>
            <button 
              className="close_btn"
              onClick={resetForm}
              disabled={isProcessing}
            >
              ×
            </button>
          </div>

          <div className="form_content">
            <div className="form_group">
              <Label htmlFor="amount">{t("amount")} ({currency.symbol})</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                min="0.01"
                step="0.01"
                disabled={isProcessing}
              />
            </div>

            {activeAction === "transfer" && (
              <>
                <div className="form_group">
                  <Label htmlFor="userId">{t("recipient_user_id")}</Label>
                  <Input
                    id="userId"
                    type="number"
                    value={transferUserId}
                    onChange={(e) => setTransferUserId(e.target.value)}
                    placeholder="Enter user ID"
                    disabled={isProcessing}
                  />
                </div>
                
                <div className="form_group">
                  <Label htmlFor="description">{t("description")} ({t("optional")})</Label>
                  <Input
                    id="description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t("transfer_description_placeholder")}
                    disabled={isProcessing}
                  />
                </div>
              </>
            )}

            <div className="form_actions">
              <Button
                onClick={resetForm}
                variant="outline"
                disabled={isProcessing}
              >
                {t("cancel")}
              </Button>
              
              <Button
                onClick={
                  activeAction === "deposit" ? handleDeposit :
                  activeAction === "withdraw" ? handleWithdraw :
                  handleTransfer
                }
                disabled={isProcessing || !amount}
                className="submit_btn"
              >
                {isProcessing ? t("processing") : t("confirm")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletActions;
