export type ToolCategory = 'Outbound' | 'LinkedIn' | 'Messaging' | 'Pipeline & CRM';

export interface Tool {
  id: string;
  name: string;
  category: ToolCategory;
}

export const TOOLS: Tool[] = [
  { id: 'instantly', name: 'Instantly', category: 'Outbound' },
  { id: 'smartlead', name: 'Smartlead', category: 'Outbound' },
  { id: 'apollo', name: 'Apollo', category: 'Outbound' },
  { id: 'clay', name: 'Clay', category: 'Outbound' },
  { id: 'ai-ark', name: 'AI ARK', category: 'Outbound' },
  { id: 'millionverifier', name: 'MillionVerifier', category: 'Outbound' },
  { id: 'linkedin', name: 'LinkedIn', category: 'LinkedIn' },
  { id: 'sales-navigator', name: 'Sales Navigator', category: 'LinkedIn' },
  { id: 'linkedhelper', name: 'Linked Helper', category: 'LinkedIn' },
  { id: 'heyreach', name: 'HeyReach', category: 'LinkedIn' },
  { id: 'expandi', name: 'Expandi', category: 'LinkedIn' },
  { id: 'claude', name: 'Claude', category: 'Messaging' },
  { id: 'lavender', name: 'Lavender', category: 'Messaging' },
  { id: 'gong', name: 'Gong', category: 'Messaging' },
  { id: 'hubspot', name: 'HubSpot', category: 'Pipeline & CRM' },
  { id: 'salesforce', name: 'Salesforce', category: 'Pipeline & CRM' },
  { id: 'pipedrive', name: 'Pipedrive', category: 'Pipeline & CRM' },
];

export const TOOL_CATEGORIES: ToolCategory[] = [
  'Outbound',
  'LinkedIn',
  'Messaging',
  'Pipeline & CRM',
];
