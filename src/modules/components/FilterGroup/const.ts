export const ops = {
  'Flat Charge': {
    DataStatus: [
      { value: 'Draft', label: 'Draft' },
      { value: 'Submit', label: 'Submit' },
    ],
  },
  'BVI Data': {
    TemplateType: [
      { value: 'BVI Manual Template', label: 'BVI Manual Template' },
      { value: 'R2R MD Import Template', label: 'R2R MD Import Template' },
      { value: 'H2R BVI Template', label: 'H2R BVI Template' },
      { value: 'H2R T&E BVI Template', label: 'H2R T&E BVI Template' },
      { value: 'H2R GMM Template', label: 'H2R GMM Template' },
      { value: 'O2C BVI Template', label: 'O2C BVI Template' },
      { value: 'O2C TI BVI Template', label: 'O2C TI BVI Template' },
      { value: 'P2P BCS Template', label: 'P2P BCS Template' },
    ],
    ChargeType: [
      { value: 'ICB', label: 'ICB' },
      { value: 'ICC', label: 'ICC' },
    ],
    BVIStatus: [
      {
        label: 'Successfully',
        value: 'Successfully',
      },
      { value: 'Unconfirm', label: 'Unconfirm' },
      { value: 'Confirm', label: 'Confirm' },
      { value: 'Obsolete', label: 'Obsolete' },
      { value: 'Freeze', label: 'Freeze' },
    ],
    AdjustTag: [
      { value: '1', label: 'Yes' },
      { value: '0', label: 'No' },
    ],
    BillingStatus: [
      {
        label: 'Freeze',
        value: 'Freeze',
      },
      {
        label: 'Successfully',
        value: 'Successfully',
      },
      {
        label: 'Manual To SAP',
        value: 'ManualToSAP',
      },
      {
        label: 'Auto To SAP',
        value: 'AutoToSAP',
      },
      {
        label: 'Waiting For SAP',
        value: 'WaitingForSAP',
      },
      {
        label: 'PostPone',
        value: 'PostPone',
      },
      {
        label: 'Unfreeze',
        value: 'Unfreeze',
      },
      // {
      //   label: 'Obsolete',
      //   value: "Obsolete",
      // },
      // {
      //   label: 'Cancel',
      //   value: "Cancel",
      // },
      {
        label: 'Error',
        value: 'Error',
      },
    ],
  },
  'BVI Integrity Report': {
    IsThereBVI: [
      { value: '1', label: 'Yes' },
      { value: '0', label: 'No' },
    ],
    MandatoryBVI: [
      { value: '1', label: 'Yes' },
      { value: '0', label: 'No' },
    ],
  },
  'Billing Data': {
    AdjustTag: [
      { value: '1', label: 'Yes' },
      { value: '0', label: 'No' },
    ],
    ChargeType: [
      { value: 'ICB', label: 'ICB' },
      { value: 'ICC', label: 'ICC' },
    ],
    ModifiedTag: [
      { value: '1', label: 'Yes' },
      { value: '0', label: 'No' },
    ],
    SETag: [
      { value: '1', label: 'Yes' },
      { value: '0', label: 'No' },
    ],
    QuarterlyCharge: [
      { value: '1', label: 'Yes' },
      { value: '0', label: 'No' },
    ],
    BillingStatus: [
      {
        label: 'Freeze',
        value: 'Freeze',
      },
      {
        label: 'Successfully',
        value: 'Successfully',
      },
      {
        label: 'Manual To SAP',
        value: 'ManualToSAP',
      },
      {
        label: 'Auto To SAP',
        value: 'AutoToSAP',
      },
      {
        label: 'Waiting For SAP',
        value: 'WaitingForSAP',
      },
      {
        label: 'PostPone',
        value: 'PostPone',
      },
      {
        label: 'Unfreeze',
        value: 'Unfreeze',
      },
      // {
      //   label: 'Obsolete',
      //   value: "Obsolete",
      // },
      // {
      //   label: 'Cancel',
      //   value: "Cancel",
      // },
      {
        label: 'Error',
        value: 'Error',
      },
    ],
  },
  'Billing Integrity Report': {
    IsThereBilling: [
      { value: '1', label: 'Yes' },
      { value: '0', label: 'No' },
    ],
    MandatoryBVI: [
      { value: '1', label: 'Yes' },
      { value: '0', label: 'No' },
    ],
  },
  Product: {
    BillingMonthTag: [
      { value: 'Last Month', label: 'Last Month' },
      { value: 'Current Month', label: 'Current Month' },
    ],
    IndividualInvoice: [
      { value: '1', label: 'Yes' },
      { value: '0', label: 'No' },
    ],
    QuarterlyCharge: [
      { value: '1', label: 'Yes' },
      { value: '0', label: 'No' },
    ],
    IsPOByPercentage: [
      { value: '1', label: 'Yes' },
      { value: '0', label: 'No' },
    ],
    Signed: [
      { value: '1', label: 'Yes' },
      { value: '0', label: 'No' },
    ],
  },
  'Customer Report': {
    BillingMonthTag: [
      { value: 'Last Month', label: 'Last Month' },
      { value: 'Current Month', label: 'Current Month' },
    ],
    AdjustTag: [
      { value: '1', label: 'Yes' },
      { value: '0', label: 'No' },
    ],
    IsFlatCharge: [
      { value: '1', label: 'Yes' },
      { value: '0', label: 'No' },
    ],
    ImportTag: [
      { value: '1', label: 'Yes' },
      { value: '0', label: 'No' },
    ],
  },
};
