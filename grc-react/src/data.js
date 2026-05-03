export const controls = [
  { id:1, name:'Performance Monitoring', code:'CAP-04', domain:'Capacity and Performance Planning', assignee:'', status:'non-compliant' },
  { id:2, name:'Security & Privacy Controls Oversight', code:'CPL-02', domain:'Compliance', assignee:'Balaji', status:'compliant' },
  { id:3, name:'Customer Responsibility Matrix (CRM)', code:'CLD-06.1', domain:'Cloud Security', assignee:'Balaji', status:'compliant' },
  { id:4, name:'Change Management Program', code:'CHG-01', domain:'Change Management', assignee:'', status:'non-compliant' },
  { id:5, name:'Data Backups', code:'BCD-11', domain:'Business Continuity and Disaster Recovery', assignee:'', status:'non-compliant' },
  { id:6, name:'Redundant Secondary System', code:'BCD-11.7', domain:'Business Continuity and Disaster Recovery', assignee:'', status:'non-compliant' },
  { id:7, name:'Bring Your Own Device (BYOD) Usage', code:'AST-18', domain:'Asset Management', assignee:'Balaji', status:'compliant' },
  { id:8, name:'Business Continuity Management System (BCMS)', code:'BCD-01', domain:'Business Continuity and Disaster Recovery', assignee:'', status:'non-compliant' },
  { id:9, name:'Capacity & Performance Management', code:'CAP-01', domain:'Capacity and Performance Planning', assignee:'', status:'non-compliant' },
  { id:10, name:'Capacity Planning', code:'CAP-03', domain:'Capacity and Performance Planning', assignee:'', status:'non-compliant' },
  { id:11, name:'Contingency Plan Testing & Exercises', code:'BCD-04', domain:'Business Continuity and Disaster Recovery', assignee:'', status:'non-compliant' },
  { id:12, name:'Secure Disposal of Equipment', code:'AST-09', domain:'Asset Management', assignee:'', status:'non-compliant' },
  { id:13, name:'Steering Committee', code:'COV-01.1', domain:'Security and Privacy Governance', assignee:'Balaji', status:'compliant' },
  { id:14, name:'Assigned Security Responsibilities', code:'GOV-04', domain:'Security and Privacy Governance', assignee:'Balaji', status:'compliant' },
  { id:15, name:'Security Governance Program', code:'COV-01', domain:'Security and Privacy Governance', assignee:'Balaji', status:'compliant' },
  { id:16, name:'Network Diagrams and Data Flow Diagrams', code:'AST-04', domain:'Asset Management', assignee:'', status:'non-compliant' },
  { id:17, name:'Periodic Review of Security Program', code:'GOV-03', domain:'Security and Privacy Governance', assignee:'Balaji', status:'compliant' },
  { id:18, name:'Defining Business Context and Mission', code:'GOV-08', domain:'Security and Privacy Governance', assignee:'Balaji', status:'compliant' },
  { id:19, name:'Publishing Security Documentation', code:'GOV-02', domain:'Security and Privacy Governance', assignee:'Balaji', status:'compliant' },
  { id:20, name:'Software Licensing Restrictions', code:'AST-02.7', domain:'Asset Management', assignee:'Balaji', status:'compliant' },
  { id:21, name:'Asset Inventories', code:'AST-02', domain:'Asset Management', assignee:'', status:'non-compliant' },
  { id:22, name:'Incident Response Plan', code:'IRP-01', domain:'Incident Management', assignee:'', status:'non-compliant' },
  { id:23, name:'Vulnerability Management Program', code:'VUL-01', domain:'Vulnerability Management', assignee:'', status:'non-compliant' },
];
export const evidences = [
  { id:1, name:'Assignment of PCI DSS Compliance Responsibility', status:'not-uploaded', estimate:'', assignee:'', gaps:'Not Evaluated' },
  { id:2, name:'Audit Trail', status:'uploaded', estimate:'', assignee:'Balaji', gaps:'No Gaps' },
  { id:3, name:'Security Updates', status:'not-uploaded', estimate:'', assignee:'', gaps:'Not Evaluated' },
  { id:4, name:'Cryptographic Architecture', status:'draft', estimate:'', assignee:'Balaji', gaps:'Not Evaluated' },
  { id:5, name:'Report of Vulnerability Scan and Remediation Status', status:'not-uploaded', estimate:'High', assignee:'', gaps:'Not Evaluated' },
  { id:6, name:'Reports of Background and Reference Checks', status:'not-uploaded', estimate:'Med-Low', assignee:'', gaps:'Not Evaluated' },
  { id:7, name:'Reviewed and Approved Network Diagram', status:'uploaded', estimate:'Med-Low', assignee:'Balaji', gaps:'No Gaps' },
  { id:8, name:'Reports of User Access Reviews', status:'not-uploaded', estimate:'High', assignee:'', gaps:'Not Evaluated' },
  { id:9, name:'Production Servers within the Primary Subnet', status:'not-uploaded', estimate:'Med-Low', assignee:'', gaps:'Not Evaluated' },
  { id:10, name:'Firewall Rule Review', status:'needs-attention', estimate:'Med-Low', assignee:'Balaji', gaps:'Gaps Detected' },
  { id:11, name:'Report of Backup Restoration Testing', status:'not-uploaded', estimate:'', assignee:'', gaps:'Not Evaluated' },
  { id:12, name:'Access Control on System Components', status:'not-uploaded', estimate:'', assignee:'', gaps:'Not Evaluated' },
  { id:13, name:'Reports of Control Monitoring and Review', status:'not-uploaded', estimate:'', assignee:'', gaps:'Not Evaluated' },
  { id:14, name:'System Event Logging and Monitoring', status:'not-uploaded', estimate:'', assignee:'', gaps:'Not Evaluated' },
  { id:15, name:'List of Security Incidents', status:'not-uploaded', estimate:'Med-Low', assignee:'', gaps:'Not Evaluated' },
  { id:16, name:'Review of Vendor Audit Reports', status:'not-uploaded', estimate:'High', assignee:'', gaps:'Not Evaluated' },
  { id:17, name:'MFA Implementation for databases', status:'uploaded', estimate:'Med-Low', assignee:'Balaji', gaps:'No Gaps' },
  { id:18, name:'Signed NDA with Customers', status:'not-uploaded', estimate:'Med-Low', assignee:'', gaps:'Not Evaluated' },
  { id:19, name:'Documented Asset Inventory and Review Dates', status:'not-uploaded', estimate:'High', assignee:'', gaps:'Not Evaluated' },
  { id:20, name:'Role Based Access on Production resources', status:'not-uploaded', estimate:'Low', assignee:'', gaps:'Not Evaluated' },
  { id:21, name:'System Configuration', status:'draft', estimate:'', assignee:'Balaji', gaps:'Not Evaluated' },
  { id:22, name:'Incident Response Training', status:'uploaded', estimate:'', assignee:'Balaji', gaps:'No Gaps' },
  { id:23, name:'Business Continuity Plan Testing Results', status:'not-uploaded', estimate:'High', assignee:'', gaps:'Not Evaluated' },
  { id:24, name:'List of Critical Technologies', status:'not-uploaded', estimate:'', assignee:'', gaps:'Not Evaluated' },
  { id:25, name:'Code Review Results and Action Items', status:'not-uploaded', estimate:'Med-Low', assignee:'', gaps:'Not Evaluated' },
];
export const vendors = [
  { id:1, name:'Acme Corp', category:'Cloud Provider', status:'not-assessed', risk:'Not Available', assignee:'Balaji', website:'acmecorp.com' },
  { id:2, name:'DataSafe Ltd', category:'Data Processing', status:'in-progress', risk:'Medium', assignee:'Balaji', website:'datasafe.io' },
  { id:3, name:'SecureNet', category:'Security', status:'needs-attention', risk:'High', assignee:'', website:'securenet.com' },
  { id:4, name:'CloudBase Inc', category:'Cloud Provider', status:'not-assessed', risk:'Not Available', assignee:'', website:'cloudbase.io' },
  { id:5, name:'TechVault', category:'SaaS', status:'completed', risk:'Low', assignee:'Balaji', website:'techvault.com' },
];
export const assets = {
  'Compute Instances': [
    { id:'arn:aws:ec2:ap-southeast-1:304789072698:instance/i-08adfbdbdd2a8fbaa', name:'cortexone', source:'AWS', risk:'Low', region:'ap-southeast-1' },
    { id:'arn:aws:ec2:ap-southeast-1:304789072698:instance/i-06734e7843fb9256e', name:'uat-ec2-as1-1a-airflowdatapipeline1', source:'AWS', risk:'Medium', region:'ap-southeast-1' },
    { id:'arn:aws:ec2:us-east-1:304789072698:instance/i-0abc123def456', name:'prod-web-server-01', source:'AWS', risk:'High', region:'us-east-1' },
  ],
  'Container Platforms': [
    { id:'arn:aws:eks:ap-southeast-1:304789072698:cluster/prod-cluster', name:'prod-cluster', source:'AWS', risk:'Medium', region:'ap-southeast-1' },
    { id:'arn:aws:eks:us-east-1:304789072698:cluster/staging-cluster', name:'staging-cluster', source:'AWS', risk:'Low', region:'us-east-1' },
  ],
  'Storage & Databases': [
    { id:'arn:aws:s3:::my-compliance-bucket', name:'my-compliance-bucket', source:'AWS', risk:'Low', region:'ap-southeast-1' },
    { id:'arn:aws:rds:ap-southeast-1:304789072698:db:prod-postgres', name:'prod-postgres', source:'AWS', risk:'High', region:'ap-southeast-1' },
    { id:'arn:aws:s3:::audit-logs-bucket', name:'audit-logs-bucket', source:'AWS', risk:'Low', region:'us-east-1' },
  ],
  'Virtual Network (VPCs)': [
    { id:'arn:aws:ec2:ap-southeast-1:304789072698:vpc/vpc-0a1b2c3d4e5f', name:'prod-vpc', source:'AWS', risk:'Low', region:'ap-southeast-1' },
    { id:'arn:aws:ec2:us-east-1:304789072698:vpc/vpc-9z8y7x6w5v', name:'staging-vpc', source:'AWS', risk:'Low', region:'us-east-1' },
  ],
  'Serverless Functions': [
    { id:'arn:aws:lambda:ap-southeast-1:304789072698:function:compliance-checker', name:'compliance-checker', source:'AWS', risk:'Low', region:'ap-southeast-1' },
    { id:'arn:aws:lambda:ap-southeast-1:304789072698:function:audit-notifier', name:'audit-notifier', source:'AWS', risk:'Low', region:'ap-southeast-1' },
  ],
  'Monitoring & Logging': [
    { id:'arn:aws:cloudwatch:ap-southeast-1:304789072698:alarm:high-cpu', name:'high-cpu-alarm', source:'AWS', risk:'Low', region:'ap-southeast-1' },
    { id:'arn:aws:logs:ap-southeast-1:304789072698:log-group:/aws/lambda/compliance', name:'/aws/lambda/compliance', source:'AWS', risk:'Low', region:'ap-southeast-1' },
  ],
  'Key Management': [
    { id:'arn:aws:kms:ap-southeast-1:304789072698:key/mrk-abc123', name:'prod-encryption-key', source:'AWS', risk:'High', region:'ap-southeast-1' },
  ],
  'Mobile Devices': [
    { id:'device-001', name:'iPhone 15 - Balaji', source:'MDM', risk:'Low', region:'global' },
    { id:'device-002', name:'MacBook Pro - Admin', source:'MDM', risk:'Low', region:'global' },
  ],
  'Identity Users': [
    { id:'arn:aws:iam::304789072698:user/balaji', name:'balaji', source:'AWS', risk:'Low', region:'global' },
    { id:'arn:aws:iam::304789072698:user/admin-svc', name:'admin-svc', source:'AWS', risk:'High', region:'global' },
    { id:'arn:aws:iam::304789072698:user/deploy-bot', name:'deploy-bot', source:'AWS', risk:'Medium', region:'global' },
  ],
  'Identity Roles': [
    { id:'arn:aws:iam::304789072698:role/AdminRole', name:'AdminRole', source:'AWS', risk:'High', region:'global' },
    { id:'arn:aws:iam::304789072698:role/ReadOnlyRole', name:'ReadOnlyRole', source:'AWS', risk:'Low', region:'global' },
  ],
  'Identity Groups': [
    { id:'arn:aws:iam::304789072698:group/Developers', name:'Developers', source:'AWS', risk:'Medium', region:'global' },
    { id:'arn:aws:iam::304789072698:group/Admins', name:'Admins', source:'AWS', risk:'High', region:'global' },
  ],
  'Code Repo': [
    { id:'github:org/compliance-app', name:'compliance-app', source:'GitHub', risk:'Medium', region:'global' },
    { id:'github:org/infra-terraform', name:'infra-terraform', source:'GitHub', risk:'High', region:'global' },
  ],
};
export const frameworks = [
  { id:1, abbr:'ISO', name:'ISO 27001:2022', color:'#1d4ed8', pct:59.7, policies:100, evidence:10.2, tests:56.3 },
  { id:2, abbr:'SOC', name:'SOC 2', color:'#0f766e', pct:42.1, policies:100, evidence:16, tests:57.8 },
  { id:3, abbr:'MAS', name:'MAS TRM 2021', color:'#7c3aed', pct:32.5, policies:100, evidence:4, tests:51.5 },
];

export const soc2Details = {
  overview: {
    title: 'SOC 2 Compliance',
    subtitle: 'Build customer confidence with robust SOC 2 compliance',
    description: 'SOC 2 is a globally recognized cybersecurity standard established by the American Institute of Certified Public Accountants (AICPA). It serves as an attestation that assesses your organization\'s controls related to security, availability, processing integrity, confidentiality, and privacy. This framework validates your protective measures for customer data, ensures dependable service delivery, and confirms operational excellence.',
    keyPoints: [
      'Demonstrate strong security controls and build customer trust',
      'Accelerate business growth with verified compliance',
      'Meet enterprise customer requirements before contract signing',
      'Reduce risk of data breaches with proven safeguards',
      'Enhance reputation through third-party validation'
    ],
    types: [
      { 
        name: 'SOC 2 Type I', 
        desc: 'Assesses the design and implementation of controls at a specific point in time',
        timeline: '3-6 months',
        useCase: 'Quick validation for urgent deals or interim assurance'
      },
      { 
        name: 'SOC 2 Type II', 
        desc: 'Evaluates both the design and operational effectiveness of controls over a period (typically 6-12 months)',
        timeline: '12-18 months',
        useCase: 'Comprehensive assurance preferred by enterprise customers'
      }
    ],
    whyItMatters: 'In today\'s digital landscape, 70% of organizations experience significant business disruption due to data breaches. SOC 2 compliance demonstrates that your company has implemented adequate controls to prevent and protect against security incidents, making it essential for service providers handling sensitive customer data.'
  },
  trustServiceCriteria: [
    {
      id: 'security',
      name: 'Security (Common Criteria)',
      abbr: 'CC',
      color: '#dc2626',
      mandatory: true,
      description: 'The Security criterion is mandatory for all SOC 2 audits. It addresses how your organization protects information and systems from unauthorized access, disclosure, and damage throughout the entire information lifecycle.',
      keyFocus: 'Protection against unauthorized access, use, disclosure, disruption, modification, or destruction',
      categories: [
        { 
          code: 'CC1', 
          name: 'Control Environment', 
          desc: 'Establishes organizational culture, integrity, ethics, and management oversight for security',
          examples: ['Board oversight of security', 'Code of conduct', 'Organizational structure', 'Accountability mechanisms']
        },
        { 
          code: 'CC2', 
          name: 'Communication and Information', 
          desc: 'Ensures security-relevant information flows to appropriate parties internally and externally',
          examples: ['Security policies published', 'Awareness training', 'Incident reporting channels', 'External communications']
        },
        { 
          code: 'CC3', 
          name: 'Risk Assessment', 
          desc: 'Formal processes for identifying, analyzing, and treating security risks',
          examples: ['Annual risk assessments', 'Threat identification', 'Risk treatment plans', 'Third-party risk evaluation']
        },
        { 
          code: 'CC4', 
          name: 'Monitoring Activities', 
          desc: 'Continuous monitoring to ensure security controls operate effectively over time',
          examples: ['SIEM implementation', 'Control testing', 'Deficiency tracking', 'Internal audits']
        },
        { 
          code: 'CC5', 
          name: 'Control Activities', 
          desc: 'Policies, procedures, and technology controls that support security objectives',
          examples: ['Security policy framework', 'Automated controls', 'Segregation of duties', 'Technology safeguards']
        },
        { 
          code: 'CC6', 
          name: 'Logical and Physical Access', 
          desc: 'Controls restricting access to information and systems to authorized users only',
          examples: ['Multi-factor authentication', 'Access provisioning', 'Quarterly access reviews', 'Encryption standards', 'Physical security']
        },
        { 
          code: 'CC7', 
          name: 'System Operations', 
          desc: 'Detection, response, and recovery capabilities for security events',
          examples: ['Vulnerability management', 'Penetration testing', 'Incident response plan', 'Anomaly detection']
        },
        { 
          code: 'CC8', 
          name: 'Change Management', 
          desc: 'Controlled approach to changes in infrastructure, applications, and configurations',
          examples: ['Change approval process', 'Code review requirements', 'Environment separation', 'Emergency procedures']
        },
        { 
          code: 'CC9', 
          name: 'Risk Mitigation', 
          desc: 'Managing risks from business relationships and external dependencies',
          examples: ['Vendor risk management', 'SOC 2 report reviews', 'Contractual protections', 'Business risk assessment']
        }
      ]
    },
    {
      id: 'availability',
      name: 'Availability',
      abbr: 'A',
      color: '#2563eb',
      mandatory: false,
      description: 'The Availability criterion ensures that systems and services are accessible for operation and use as committed in service level agreements. This is critical for organizations that promise specific uptime guarantees.',
      keyFocus: 'System uptime, performance, and accessibility commitments',
      controls: [
        { name: 'Capacity Planning', desc: 'Monitor system resources and establish scaling thresholds' },
        { name: 'Business Continuity Plan', desc: 'Documented disaster recovery with RTO and RPO objectives' },
        { name: 'Backup and Recovery', desc: 'Automated backups with quarterly restoration testing' },
        { name: 'Redundancy and Failover', desc: 'Redundant infrastructure with tested failover procedures' },
        { name: 'Uptime Monitoring', desc: 'Real-time monitoring with automated alerting' },
        { name: 'Incident Response', desc: 'Escalation procedures for availability incidents' }
      ]
    },
    {
      id: 'processing',
      name: 'Processing Integrity',
      abbr: 'PI',
      color: '#7c3aed',
      mandatory: false,
      description: 'Processing Integrity ensures that system processing is complete, valid, accurate, timely, and authorized. This criterion is essential for organizations handling financial transactions, calculations, or data transformations.',
      keyFocus: 'Accurate, complete, and timely data processing',
      controls: [
        { name: 'Input Validation', desc: 'Validate data inputs for completeness and accuracy' },
        { name: 'Processing Monitoring', desc: 'Monitor jobs for errors and anomalies in real-time' },
        { name: 'Output Verification', desc: 'Reconciliation procedures to verify processing results' },
        { name: 'Error Handling', desc: 'Documented procedures for investigating and correcting errors' },
        { name: 'Data Integrity Checks', desc: 'Checksums and hash verification for data integrity' },
        { name: 'Audit Trails', desc: 'Immutable logs of all processing activities' }
      ]
    },
    {
      id: 'confidentiality',
      name: 'Confidentiality',
      abbr: 'C',
      color: '#0891b2',
      mandatory: false,
      description: 'Confidentiality addresses how organizations protect information designated as confidential from unauthorized disclosure. This goes beyond basic access controls to include data classification, encryption, and handling procedures.',
      keyFocus: 'Protection of sensitive and confidential information',
      controls: [
        { name: 'Data Classification', desc: 'Define classification levels with handling requirements' },
        { name: 'Confidential Data Inventory', desc: 'Maintain inventory of confidential assets and locations' },
        { name: 'Encryption Requirements', desc: 'AES-256 at rest, TLS 1.2+ in transit with key management' },
        { name: 'Non-Disclosure Agreements', desc: 'NDAs with employees, contractors, and vendors' },
        { name: 'Data Loss Prevention', desc: 'DLP controls to prevent unauthorized transmission' },
        { name: 'Secure Disposal', desc: 'Documented procedures for secure data destruction' }
      ]
    },
    {
      id: 'privacy',
      name: 'Privacy',
      abbr: 'P',
      color: '#059669',
      mandatory: false,
      description: 'The Privacy criterion ensures personal information is collected, used, retained, disclosed, and disposed of in accordance with privacy commitments and applicable regulations like GDPR and CCPA.',
      keyFocus: 'Personal information lifecycle management and privacy compliance',
      controls: [
        { name: 'Privacy Notice', desc: 'Clear notice describing data collection and usage practices' },
        { name: 'Consent Management', desc: 'Obtain and record consent with withdrawal mechanisms' },
        { name: 'Purpose Limitation', desc: 'Use data only for documented, consented purposes' },
        { name: 'Data Minimization', desc: 'Collect only necessary personal information' },
        { name: 'Data Subject Rights', desc: 'Process access, correction, and deletion requests within 30 days' },
        { name: 'Third-Party Sharing', desc: 'Data processing agreements with all third parties' },
        { name: 'Retention Schedules', desc: 'Defined retention periods with automated deletion' },
        { name: 'Privacy Impact Assessments', desc: 'PIAs for new products and data processing activities' }
      ]
    }
  ],
  auditProcess: [
    { 
      phase: 'Planning & Scoping', 
      duration: '2-4 weeks', 
      icon: '📋',
      activities: [
        'Define audit scope and boundaries',
        'Select applicable Trust Service Criteria',
        'Identify in-scope systems and processes',
        'Set timeline with milestones and deadlines',
        'Select and engage SOC 2 auditor'
      ],
      deliverable: 'Audit scope document and project plan'
    },
    { 
      phase: 'Risk Assessment', 
      duration: '2-4 weeks', 
      icon: '⚠️',
      activities: [
        'Conduct comprehensive risk assessment',
        'Identify threats to data security and availability',
        'Document mitigation controls for each risk',
        'Assess likelihood and impact ratings',
        'Create risk treatment plans'
      ],
      deliverable: 'Risk register with treatment plans'
    },
    { 
      phase: 'Gap Analysis & Remediation', 
      duration: '2-4 months', 
      icon: '🔧',
      activities: [
        'Perform gap analysis against SOC 2 requirements',
        'Implement missing security controls',
        'Draft and approve policies and procedures',
        'Configure security tooling and automation',
        'Establish evidence collection processes'
      ],
      deliverable: 'Implemented controls and documented policies'
    },
    { 
      phase: 'Observation Period', 
      duration: '6-12 months', 
      icon: '👁️',
      activities: [
        'Operate controls consistently throughout period',
        'Collect evidence for all in-scope controls',
        'Conduct quarterly access reviews',
        'Perform regular vulnerability scans',
        'Document all security incidents and responses'
      ],
      deliverable: 'Complete evidence package for audit'
    },
    { 
      phase: 'Audit Fieldwork', 
      duration: '3-6 weeks', 
      icon: '🔍',
      activities: [
        'Submit evidence to auditor for review',
        'Participate in control walkthroughs',
        'Respond to auditor inquiries and requests',
        'Address identified control deficiencies',
        'Conduct management interviews'
      ],
      deliverable: 'Auditor testing and validation complete'
    },
    { 
      phase: 'Report Issuance', 
      duration: '2-4 weeks', 
      icon: '📄',
      activities: [
        'Review draft audit report',
        'Provide management responses to exceptions',
        'Address any final auditor questions',
        'Receive final SOC 2 report',
        'Share report with customers and stakeholders'
      ],
      deliverable: 'Final SOC 2 Type I or Type II report'
    }
  ],
  commonGaps: [
    { 
      gap: 'Stale or Incomplete Risk Assessments', 
      impact: 'Critical', 
      desc: 'Risk assessment created once but never updated to reflect current architecture, new threats, or business changes. Auditors expect living documents that evolve with your organization.',
      solution: 'Conduct risk assessments at least annually and whenever significant changes occur (new products, infrastructure migrations, acquisitions).'
    },
    { 
      gap: 'Inconsistent Access Reviews', 
      impact: 'High', 
      desc: 'Policy requires quarterly access reviews, but evidence shows only one or two reviews during the 12-month observation period. Auditors sample every quarter.',
      solution: 'Schedule recurring calendar reminders and assign clear ownership for quarterly user access reviews across all systems.'
    },
    { 
      gap: 'Delayed Access Termination', 
      impact: 'High', 
      desc: 'HR records show employee termination on one date, but system access was not revoked until days or weeks later. Any gap is a control failure.',
      solution: 'Implement automated deprovisioning workflows that trigger immediately upon HR system updates. Target: access removal within 24 hours.'
    },
    { 
      gap: 'Missing Change Approvals', 
      impact: 'High', 
      desc: 'Developers merging their own pull requests without peer review, or production changes deployed without documented approval.',
      solution: 'Enforce branch protection rules requiring peer review. Maintain change logs with approval records for all production changes.'
    },
    { 
      gap: 'Untested Backup Restoration', 
      impact: 'High', 
      desc: 'Automated backups run daily, but no evidence of successful restoration testing. Until you restore a backup, you only have hope, not assurance.',
      solution: 'Test backup restoration at least quarterly. Document the process, time to recovery, and data integrity verification.'
    },
    { 
      gap: 'Incomplete Vendor Inventory', 
      impact: 'Medium', 
      desc: 'Vendor list shows 8 vendors, but system description references 15 integrations. Missing SOC 2 reports or security assessments for critical vendors.',
      solution: 'Maintain comprehensive vendor inventory. Collect SOC 2 reports or conduct security assessments for all vendors with data access.'
    },
    { 
      gap: 'MFA Not Enforced Everywhere', 
      impact: 'Critical', 
      desc: 'MFA enabled on SSO but not enforced on AWS root account, database consoles, CI/CD pipelines, or service accounts.',
      solution: 'Enforce MFA on all access to production systems, cloud consoles, VPN, and any system containing customer data. No exceptions.'
    },
    { 
      gap: 'Shared Service Accounts', 
      impact: 'High', 
      desc: 'Multiple engineers sharing a single AWS IAM account, database credential, or admin password. No individual accountability for actions.',
      solution: 'Eliminate shared credentials. Implement individual accounts with role-based access control (RBAC) for all users.'
    },
    { 
      gap: 'Security Training Gaps', 
      impact: 'Medium', 
      desc: 'Security awareness training completed by 85% of staff. Auditor notes that 15% of employees—including some with admin access—have no training record.',
      solution: 'Require 100% completion of annual security training. Track completion rates and follow up on missing training before audit.'
    },
    { 
      gap: 'Logging and Monitoring Gaps', 
      impact: 'High', 
      desc: 'SIEM collects logs from applications and infrastructure, but not from identity provider, VPN, cloud console, or other critical access points.',
      solution: 'Implement comprehensive logging across all in-scope systems. Ensure logs are centralized, retained, and monitored for security events.'
    },
    {
      gap: 'No Incident Response Testing',
      impact: 'Medium',
      desc: 'Incident response plan exists but has never been tested through tabletop exercises. Team has never practiced coordinated response.',
      solution: 'Conduct annual tabletop exercises to test incident response procedures. Document findings and update plan based on lessons learned.'
    },
    {
      gap: 'Policies Without Evidence',
      impact: 'High',
      desc: 'Comprehensive security policies documented, but no evidence that controls described are actually implemented or followed in practice.',
      solution: 'For every policy requirement, maintain evidence of implementation (screenshots, logs, reports, tickets) throughout observation period.'
    }
  ],
  timeline: {
    type1: {
      duration: '3-6 months',
      description: 'SOC 2 Type I can be completed faster as it only requires a point-in-time assessment',
      phases: 'Planning (2-4 weeks) + Remediation (2-4 months) + Audit (3-4 weeks)'
    },
    type2: {
      duration: '12-18 months',
      description: 'SOC 2 Type II requires a 6-12 month observation period to demonstrate consistent control operation',
      phases: 'Planning (2-4 weeks) + Remediation (2-4 months) + Observation (6-12 months) + Audit (3-6 weeks)'
    },
    annual: 'SOC 2 reports are valid for 12 months. Annual audits are required to maintain compliance and customer trust.',
    note: 'Organizations with strong existing security programs can sometimes compress timelines. Those starting from scratch should budget for the longer end of these ranges.'
  },
  costs: {
    readiness: {
      range: '$15,000 - $40,000',
      description: 'Gap analysis, scope definition, and remediation roadmap from compliance experts'
    },
    remediation: {
      range: '$20,000 - $100,000+',
      description: 'Implementing missing controls, security tooling, policy development, and process establishment'
    },
    audit: {
      range: '$30,000 - $80,000',
      description: 'Third-party auditor fees for SOC 2 Type II audit (Type I typically $15,000 - $40,000)'
    },
    annual: {
      range: '$50,000 - $150,000',
      description: 'Ongoing costs including annual audit, compliance platform, continuous monitoring, and maintenance'
    },
    factors: [
      'Organization size and complexity',
      'Number of Trust Service Criteria selected',
      'Current security posture and maturity',
      'Number of in-scope systems and locations',
      'Auditor selection and reputation'
    ]
  },
  benefits: [
    {
      title: 'Build Customer Trust',
      desc: 'Demonstrate your commitment to data security with third-party validation',
      icon: '🤝'
    },
    {
      title: 'Win Enterprise Deals',
      desc: 'Meet procurement requirements for large customers who mandate SOC 2',
      icon: '💼'
    },
    {
      title: 'Reduce Security Risks',
      desc: 'Implement proven controls that protect against data breaches and incidents',
      icon: '🛡️'
    },
    {
      title: 'Competitive Advantage',
      desc: 'Stand out from competitors who lack formal security attestation',
      icon: '🏆'
    },
    {
      title: 'Operational Excellence',
      desc: 'Improve internal processes, documentation, and security practices',
      icon: '⚙️'
    },
    {
      title: 'Regulatory Alignment',
      desc: 'Align with GDPR, CCPA, HIPAA, and other regulatory requirements',
      icon: '📋'
    }
  ],
  gettingStarted: [
    {
      step: 'Assess Your Readiness',
      description: 'Conduct a gap analysis to understand your current security posture against SOC 2 requirements',
      action: 'Schedule a readiness assessment'
    },
    {
      step: 'Define Your Scope',
      description: 'Determine which Trust Service Criteria apply to your business and which systems are in scope',
      action: 'Document system boundaries'
    },
    {
      step: 'Implement Controls',
      description: 'Address identified gaps by implementing missing security controls and documenting policies',
      action: 'Create remediation roadmap'
    },
    {
      step: 'Collect Evidence',
      description: 'Establish processes to continuously collect evidence of control operation throughout observation period',
      action: 'Set up evidence repository'
    },
    {
      step: 'Engage an Auditor',
      description: 'Select and engage a qualified CPA firm with SOC 2 audit experience',
      action: 'Request auditor proposals'
    },
    {
      step: 'Complete the Audit',
      description: 'Work with your auditor through fieldwork, testing, and report issuance',
      action: 'Prepare for audit fieldwork'
    }
  ],
  faqs: [
    {
      q: 'Who needs SOC 2 compliance?',
      a: 'SOC 2 is essential for technology and cloud-based service providers that store, process, or transmit customer data. This includes SaaS companies, hosting providers, data centers, and any organization where customers need assurance about data security practices.'
    },
    {
      q: 'What is the difference between SOC 2 Type I and Type II?',
      a: 'Type I evaluates whether controls are properly designed at a single point in time. Type II evaluates whether those controls operated effectively over a period (typically 6-12 months). Enterprise customers almost always require Type II because it provides assurance of consistent operation.'
    },
    {
      q: 'Which Trust Service Criteria should I include?',
      a: 'Security (Common Criteria) is mandatory for all SOC 2 audits. Beyond that, select criteria based on your service commitments. Most SaaS companies include Security + Availability + Confidentiality. Add Processing Integrity if you handle financial calculations. Add Privacy if you collect personal information directly from individuals.'
    },
    {
      q: 'How long does SOC 2 compliance take?',
      a: 'For first-time SOC 2 Type II, expect 12-18 months from project kickoff to final report. This includes 2-4 months of remediation and a 6-12 month observation period. Type I can be completed in 3-6 months since it does not require an observation period.'
    },
    {
      q: 'Can I fail a SOC 2 audit?',
      a: 'Technically, you cannot "fail" a SOC 2 audit. However, auditors may issue a qualified opinion with exceptions describing control deficiencies. Some customers will accept reports with minor exceptions if you provide remediation plans. Others—especially large enterprises—require clean reports without exceptions.'
    },
    {
      q: 'How much does SOC 2 compliance cost?',
      a: 'Total first-year costs typically range from $65,000 to $220,000, including readiness assessment ($15K-$40K), remediation ($20K-$100K+), and audit ($30K-$80K). Ongoing annual costs are $50K-$150K for maintenance, monitoring, and annual audits. Costs vary based on organization size, complexity, and current security posture.'
    }
  ]
};
export const libraryFrameworks = [
  { abbr:'PCI', name:'PCI DSS 4.0', color:'#dc2626', desc:'Payment Card Industry Data Security Standard' },
  { abbr:'NIST', name:'NIST CSF 2.0', color:'#0369a1', desc:'NIST Cybersecurity Framework' },
  { abbr:'HIPAA', name:'HIPAA', color:'#b45309', desc:'Health Insurance Portability and Accountability Act' },
  { abbr:'GDPR', name:'GDPR', color:'#0891b2', desc:'General Data Protection Regulation' },
];
export const policies = [
  { id:1, name:'Information Security Policy', version:'v2.1', status:'active', owner:'Balaji', lastReviewed:'2025-01-15', framework:'ISO 27001:2022' },
  { id:2, name:'Acceptable Use Policy', version:'v1.3', status:'active', owner:'Balaji', lastReviewed:'2025-02-01', framework:'SOC 2' },
  { id:3, name:'Data Classification Policy', version:'v1.0', status:'draft', owner:'', lastReviewed:'2025-03-10', framework:'ISO 27001:2022' },
  { id:4, name:'Incident Response Policy', version:'v3.0', status:'active', owner:'Balaji', lastReviewed:'2025-01-20', framework:'SOC 2' },
  { id:5, name:'Business Continuity Policy', version:'v2.0', status:'under-review', owner:'', lastReviewed:'2024-12-01', framework:'MAS TRM 2021' },
  { id:6, name:'Access Control Policy', version:'v1.5', status:'active', owner:'Balaji', lastReviewed:'2025-02-15', framework:'ISO 27001:2022' },
  { id:7, name:'Cryptography Policy', version:'v1.1', status:'active', owner:'Balaji', lastReviewed:'2025-01-10', framework:'ISO 27001:2022' },
  { id:8, name:'Vendor Management Policy', version:'v1.0', status:'draft', owner:'', lastReviewed:'2025-03-01', framework:'SOC 2' },
];
export const findings = [
  { id:1, title:'S3 Bucket Public Access Enabled', severity:'critical', status:'open', asset:'audit-logs-bucket', source:'AWS Config', discovered:'2025-03-15', assignee:'Balaji' },
  { id:2, title:'IAM User Without MFA', severity:'high', status:'open', asset:'admin-svc', source:'AWS Security Hub', discovered:'2025-03-10', assignee:'' },
  { id:3, title:'Unencrypted RDS Instance', severity:'high', status:'in-progress', asset:'prod-postgres', source:'AWS Config', discovered:'2025-03-08', assignee:'Balaji' },
  { id:4, title:'Security Group Allows All Inbound Traffic', severity:'medium', status:'open', asset:'prod-vpc', source:'AWS Config', discovered:'2025-03-12', assignee:'' },
  { id:5, title:'CloudTrail Logging Disabled', severity:'high', status:'resolved', asset:'us-east-1', source:'AWS Security Hub', discovered:'2025-02-20', assignee:'Balaji' },
  { id:6, title:'Root Account Usage Detected', severity:'critical', status:'open', asset:'AWS Root', source:'AWS GuardDuty', discovered:'2025-03-18', assignee:'' },
  { id:7, title:'Lambda Function With Excessive Permissions', severity:'medium', status:'in-progress', asset:'compliance-checker', source:'AWS Config', discovered:'2025-03-05', assignee:'Balaji' },
  { id:8, title:'Outdated SSL Certificate', severity:'low', status:'resolved', asset:'prod-web-server-01', source:'Manual Scan', discovered:'2025-02-10', assignee:'Balaji' },
];
export const targets = [
  { id:1, name:'Production AWS Account', type:'Cloud', status:'active', lastScan:'2025-04-01', findings:3, assignee:'Balaji' },
  { id:2, name:'Staging Environment', type:'Cloud', status:'active', lastScan:'2025-03-28', findings:1, assignee:'Balaji' },
  { id:3, name:'Corporate Network', type:'Network', status:'active', lastScan:'2025-03-25', findings:2, assignee:'' },
  { id:4, name:'Web Application - prod', type:'Application', status:'active', lastScan:'2025-04-02', findings:4, assignee:'Balaji' },
  { id:5, name:'Mobile App - iOS', type:'Application', status:'inactive', lastScan:'2025-02-15', findings:0, assignee:'' },
];
export const employees = [
  { id:1, name:'Balaji Krishnan', email:'balaji@company.com', role:'Admin', department:'IT Security', status:'active', trainingComplete:true },
  { id:2, name:'Priya Sharma', email:'priya@company.com', role:'Editor', department:'Compliance', status:'active', trainingComplete:true },
  { id:3, name:'Ravi Kumar', email:'ravi@company.com', role:'Viewer', department:'Engineering', status:'active', trainingComplete:false },
  { id:4, name:'Anita Patel', email:'anita@company.com', role:'Editor', department:'Legal', status:'active', trainingComplete:true },
  { id:5, name:'Suresh Menon', email:'suresh@company.com', role:'Viewer', department:'Finance', status:'inactive', trainingComplete:false },
  { id:6, name:'Deepa Nair', email:'deepa@company.com', role:'Viewer', department:'HR', status:'active', trainingComplete:true },
];
export const risks = [
  { id:1, title:'Data Breach via Misconfigured S3', category:'Cloud Security', likelihood:4, impact:5, inherent:'Critical', residual:'High', status:'open', owner:'Balaji', treatment:'Mitigate' },
  { id:2, title:'Ransomware Attack on Endpoints', category:'Endpoint Security', likelihood:3, impact:5, inherent:'High', residual:'Medium', status:'in-progress', owner:'Balaji', treatment:'Mitigate' },
  { id:3, title:'Third-Party Vendor Data Leak', category:'Vendor Risk', likelihood:3, impact:4, inherent:'High', residual:'Medium', status:'open', owner:'', treatment:'Transfer' },
  { id:4, title:'Insider Threat - Privileged Access Abuse', category:'Access Control', likelihood:2, impact:5, inherent:'High', residual:'Low', status:'mitigated', owner:'Balaji', treatment:'Mitigate' },
  { id:5, title:'DDoS Attack on Web Application', category:'Network Security', likelihood:4, impact:3, inherent:'Medium', residual:'Low', status:'mitigated', owner:'Balaji', treatment:'Mitigate' },
  { id:6, title:'Compliance Failure - GDPR Violation', category:'Compliance', likelihood:2, impact:4, inherent:'Medium', residual:'Low', status:'open', owner:'', treatment:'Accept' },
  { id:7, title:'Phishing Attack on Employees', category:'Human Factor', likelihood:5, impact:3, inherent:'High', residual:'Medium', status:'in-progress', owner:'Balaji', treatment:'Mitigate' },
];
export const auditItems = [
  { id:1, name:'ISO 27001:2022 Annual Audit', framework:'ISO 27001:2022', status:'scheduled', date:'2025-06-15', auditor:'External - KPMG', scope:'Full', assignee:'Balaji' },
  { id:2, name:'SOC 2 Type II Audit', framework:'SOC 2', status:'in-progress', date:'2025-05-01', auditor:'External - Deloitte', scope:'Full', assignee:'Balaji' },
  { id:3, name:'MAS TRM Internal Review', framework:'MAS TRM 2021', status:'completed', date:'2025-03-01', auditor:'Internal', scope:'Partial', assignee:'Balaji' },
  { id:4, name:'PCI DSS Gap Assessment', framework:'PCI DSS 4.0', status:'scheduled', date:'2025-07-10', auditor:'External - PwC', scope:'Full', assignee:'' },
];
export const correctiveActions = [
  { id:1, title:'Enable MFA for all IAM users', source:'Audit Finding', priority:'high', status:'in-progress', dueDate:'2025-05-01', assignee:'Balaji', relatedControl:'GOV-04' },
  { id:2, title:'Encrypt all S3 buckets at rest', source:'Risk Assessment', priority:'high', status:'open', dueDate:'2025-04-30', assignee:'', relatedControl:'AST-02' },
  { id:3, title:'Implement DLP solution', source:'Audit Finding', priority:'medium', status:'open', dueDate:'2025-06-15', assignee:'Balaji', relatedControl:'CPL-02' },
  { id:4, title:'Update Incident Response Plan', source:'Policy Review', priority:'medium', status:'completed', dueDate:'2025-03-31', assignee:'Balaji', relatedControl:'IRP-01' },
  { id:5, title:'Conduct Security Awareness Training', source:'Risk Assessment', priority:'low', status:'in-progress', dueDate:'2025-05-15', assignee:'Balaji', relatedControl:'GOV-08' },
];
export const trainingCampaigns = [
  { id:1, name:'Security Awareness Training 2025', status:'active', enrolled:6, completed:4, dueDate:'2025-05-31', type:'Mandatory' },
  { id:2, name:'Phishing Simulation Q1', status:'completed', enrolled:6, completed:6, dueDate:'2025-03-31', type:'Simulation' },
  { id:3, name:'GDPR Data Privacy Training', status:'active', enrolled:6, completed:2, dueDate:'2025-06-30', type:'Mandatory' },
  { id:4, name:'Secure Coding Practices', status:'draft', enrolled:0, completed:0, dueDate:'2025-07-31', type:'Optional' },
];
export const accessReviews = [
  { id:1, name:'Q1 2025 Access Review', status:'completed', reviewDate:'2025-03-31', reviewedBy:'Balaji', totalAccess:45, revoked:3, approved:42 },
  { id:2, name:'Admin Privileges Review', status:'in-progress', reviewDate:'2025-04-30', reviewedBy:'Balaji', totalAccess:8, revoked:0, approved:6 },
  { id:3, name:'Third-Party Access Review', status:'scheduled', reviewDate:'2025-05-31', reviewedBy:'', totalAccess:12, revoked:0, approved:0 },
];
export const questionnaires = [
  { id:1, vendor:'DataSafe Ltd', name:'Security Assessment Questionnaire', status:'in-progress', sent:'2025-03-01', dueDate:'2025-04-01', responses:18, total:30 },
  { id:2, vendor:'SecureNet', name:'Vendor Risk Assessment', status:'overdue', sent:'2025-02-15', dueDate:'2025-03-15', responses:5, total:25 },
  { id:3, vendor:'Acme Corp', name:'Cloud Security Questionnaire', status:'not-sent', sent:'', dueDate:'', responses:0, total:20 },
];
export const trustDocuments = [
  { id:1, name:'SOC 2 Type II Report 2024', type:'Audit Report', status:'published', date:'2025-01-15', visibility:'Public' },
  { id:2, name:'ISO 27001 Certificate', type:'Certificate', status:'published', date:'2024-11-01', visibility:'Public' },
  { id:3, name:'Penetration Test Report Q4 2024', type:'Security Report', status:'restricted', date:'2025-01-10', visibility:'NDA Required' },
  { id:4, name:'Privacy Policy', type:'Policy', status:'published', date:'2025-02-01', visibility:'Public' },
  { id:5, name:'Data Processing Agreement', type:'Legal', status:'published', date:'2025-01-20', visibility:'Customers Only' },
];
export const thirdPartyScans = [
  { id:1, name:'Qualys VMDR Scan - April 2025', tool:'Qualys', status:'completed', date:'2025-04-01', critical:2, high:5, medium:8, low:12 },
  { id:2, name:'Nessus Network Scan - March 2025', tool:'Nessus', status:'completed', date:'2025-03-15', critical:0, high:3, medium:6, low:9 },
  { id:3, name:'Burp Suite Web App Scan', tool:'Burp Suite', status:'in-progress', date:'2025-04-10', critical:1, high:2, medium:4, low:3 },
  { id:4, name:'AWS Inspector Scan', tool:'AWS Inspector', status:'completed', date:'2025-04-05', critical:1, high:4, medium:7, low:15 },
];

export const soc2Requirements = [
  {
    id: 'CC1.0',
    title: 'CC1.0-Common Criteria for Confidentiality, Availability and Security',
    count: 5,
    items: [
      {
        id: 'CC1.1',
        title: 'CC1.1 - COSO Principle 1: The entity demonstrates a commitment to integrity and ethical values.',
        controls: ['GOV-08', 'HRS-03', 'HRS-05', 'HRS-05.1', 'HRS-06.1'],
        status: 'In Scope'
      },
      {
        id: 'CC1.2',
        title: 'CC1.2 - COSO Principle 2: The board of directors demonstrates independence from management and exercises oversight of the development and performance of internal control.',
        controls: ['GOV-01', 'GOV-01.1'],
        status: 'In Scope'
      },
      {
        id: 'CC1.3',
        title: 'CC1.3 - COSO Principle 3: Management establishes, with board oversight, structures, reporting lines, and appropriate authorities and responsibilities in the pursuit of objectives.',
        controls: ['GOV-02', 'GOV-04', 'HRS-03'],
        status: 'In Scope'
      },
      {
        id: 'CC1.4',
        title: 'CC1.4 - COSO Principle 4: The entity demonstrates a commitment to attract, develop, and retain competent individuals in alignment with objectives.',
        controls: ['HRS-01', 'HRS-03.1', 'HRS-04', 'HRS-05', 'PRM-03'],
        status: 'In Scope'
      },
      {
        id: 'CC1.5',
        title: 'CC1.5 - COSO Principle 5: The entity holds individuals accountable for their internal control responsibilities in the pursuit of objectives.',
        controls: ['CAP-04', 'HRS-03', 'HRS-05.1'],
        status: 'In Scope'
      }
    ]
  },
  {
    id: 'CC2.0',
    title: 'CC2.0-Common Criteria for Confidentiality, Availability and Security',
    count: 3,
    items: [
      { id: 'CC2.1', title: 'CC2.1 - The entity obtains or generates and uses relevant, quality information to support the functioning of internal control.', controls: ['INF-01'], status: 'In Scope' },
      { id: 'CC2.2', title: 'CC2.2 - The entity internally communicates information, including objectives and responsibilities for internal control, necessary to support the functioning of internal control.', controls: ['INF-02'], status: 'In Scope' },
      { id: 'CC2.3', title: 'CC2.3 - The entity communicates with external parties regarding matters affecting the functioning of internal control.', controls: ['INF-03'], status: 'In Scope' }
    ]
  },
  {
    id: 'CC3.0',
    title: 'CC3.0-Common Criteria for Confidentiality, Availability and Security',
    count: 4,
    items: [
      { id: 'CC3.1', title: 'CC3.1 - The entity specifies objectives with sufficient clarity to enable the identification and assessment of risks relating to objectives.', controls: ['RSK-01'], status: 'In Scope' },
      { id: 'CC3.2', title: 'CC3.2 - The entity identifies risks to the achievement of its objectives across the entity and analyzes risks as a basis for determining how the risks should be managed.', controls: ['RSK-02'], status: 'In Scope' },
      { id: 'CC3.3', title: 'CC3.3 - The entity considers the potential for fraud in assessing risks to the achievement of objectives.', controls: ['RSK-03'], status: 'In Scope' },
      { id: 'CC3.4', title: 'CC3.4 - The entity identifies and assesses changes that could significantly impact the system of internal control.', controls: ['RSK-04'], status: 'In Scope' }
    ]
  },
  {
    id: 'CC4.0',
    title: 'CC4.0-Common Criteria for Confidentiality, Availability and Security',
    count: 2,
    items: [
      { id: 'CC4.1', title: 'CC4.1 - The entity selects, develops, and performs ongoing and/or separate evaluations to ascertain whether the components of internal control are present and functioning.', controls: ['MON-01'], status: 'In Scope' },
      { id: 'CC4.2', title: 'CC4.2 - The entity evaluates and communicates internal control deficiencies in a timely manner to those parties responsible for taking corrective action.', controls: ['MON-02'], status: 'In Scope' }
    ]
  },
  {
    id: 'CC5.0',
    title: 'CC5.0-Common Criteria for Confidentiality, Availability and Security',
    count: 3,
    items: [
      { id: 'CC5.1', title: 'CC5.1 - The entity selects and develops control activities that contribute to the mitigation of risks to the achievement of objectives to acceptable levels.', controls: ['CTL-01'], status: 'In Scope' },
      { id: 'CC5.2', title: 'CC5.2 - The entity also selects and develops general control activities over technology to support the achievement of objectives.', controls: ['CTL-02'], status: 'In Scope' },
      { id: 'CC5.3', title: 'CC5.3 - The entity deploys control activities through policies that establish what is expected and procedures that put policies into action.', controls: ['CTL-03'], status: 'In Scope' }
    ]
  },
  {
    id: 'CC6.0',
    title: 'CC6.0-Common Criteria for Confidentiality, Availability and Security',
    count: 8,
    items: [
      { id: 'CC6.1', title: 'CC6.1 - The entity implements logical access security software, infrastructure, and architectures over protected information assets to protect them from security events to meet the entity\'s objectives.', controls: ['SEC-01', 'SEC-02'], status: 'In Scope' },
      { id: 'CC6.2', title: 'CC6.2 - Prior to issuing system credentials and granting system access, the entity registers and authorizes new internal and external users whose access is administered by the entity.', controls: ['SEC-03'], status: 'In Scope' },
      { id: 'CC6.3', title: 'CC6.3 - The entity authorizes, modifies, or removes access to data, software, functions, and other protected information assets based on roles, responsibilities, or the system design.', controls: ['SEC-04'], status: 'In Scope' },
      { id: 'CC6.4', title: 'CC6.4 - The entity restricts physical access to facilities and protected information assets.', controls: ['SEC-05'], status: 'In Scope' },
      { id: 'CC6.5', title: 'CC6.5 - The entity discontinues logical and physical protections over physical assets only after the ability to read or recover data and software from those assets has been diminished and is no longer required.', controls: ['SEC-06'], status: 'In Scope' },
      { id: 'CC6.6', title: 'CC6.6 - The entity implements logical access security measures to protect against threats from sources outside its system boundaries.', controls: ['SEC-07'], status: 'In Scope' },
      { id: 'CC6.7', title: 'CC6.7 - The entity restricts the transmission, movement, and removal of information to authorized internal and external users and processes.', controls: ['SEC-08'], status: 'In Scope' },
      { id: 'CC6.8', title: 'CC6.8 - The entity implements controls to prevent or detect and act upon the introduction of unauthorized or malicious software.', controls: ['SEC-09'], status: 'In Scope' }
    ]
  },
  {
    id: 'CC7.0',
    title: 'CC7.0-Common Criteria for Confidentiality, Availability and Security',
    count: 5,
    items: [
      { id: 'CC7.1', title: 'CC7.1 - To meet its objectives, the entity uses detection and monitoring procedures to identify (1) changes to configurations that result in the introduction of new vulnerabilities, and (2) susceptibilities to newly discovered vulnerabilities.', controls: ['SYS-01'], status: 'In Scope' },
      { id: 'CC7.2', title: 'CC7.2 - The entity monitors system components and the operation of those components for anomalies that are indicative of malicious acts or compromised systems.', controls: ['SYS-02'], status: 'In Scope' },
      { id: 'CC7.3', title: 'CC7.3 - The entity evaluates security events to determine whether they could or have resulted in a failure of the entity to meet its objectives (security incidents).', controls: ['SYS-03'], status: 'In Scope' },
      { id: 'CC7.4', title: 'CC7.4 - The entity responds to identified security incidents by executing a defined incident response program.', controls: ['SYS-04'], status: 'In Scope' },
      { id: 'CC7.5', title: 'CC7.5 - The entity identifies, develops, and implements activities to recover from identified security incidents.', controls: ['SYS-05'], status: 'In Scope' }
    ]
  },
  {
    id: 'CC8.0',
    title: 'CC8.0-Common Criteria for Confidentiality, Availability and Security',
    count: 1,
    items: [
      {
        id: 'CC8.1',
        title: 'CC8.1 - The entity authorizes, designs, develops or acquires, configures, documents, tests, approves, and implements changes to infrastructure, data, software, and procedures to meet its objectives.',
        controls: ['CHG-01', 'CHG-02', 'CHG-02.2', 'PRM-07', 'TDA-06'],
        status: 'In Scope'
      }
    ]
  },
  {
    id: 'CC9.0',
    title: 'CC9.0-Common Criteria for Confidentiality, Availability and Security',
    count: 2,
    items: [
      { id: 'CC9.1', title: 'CC9.1 - The entity identifies, selects, and develops risk mitigation activities for risks arising from potential business disruptions.', controls: ['MIT-01'], status: 'In Scope' },
      { id: 'CC9.2', title: 'CC9.2 - The entity assesses and manages risks associated with vendors and business partners.', controls: ['MIT-02'], status: 'In Scope' }
    ]
  },
  {
    id: 'A1.0',
    title: 'A1.0 - Additional Criteria for Availability',
    count: 3,
    items: [
      { id: 'A1.1', title: 'A1.1 - The entity maintains, monitors, and evaluates current processing capacity and use of system components.', controls: ['AVA-01'], status: 'In Scope' },
      { id: 'A1.2', title: 'A1.2 - The entity authorizes, designs, develops or acquires, implements, operates, approves, maintains, and monitors environmental protections.', controls: ['AVA-02'], status: 'In Scope' },
      { id: 'A1.3', title: 'A1.3 - The entity tests recovery plan procedures supporting system recovery.', controls: ['AVA-03'], status: 'In Scope' }
    ]
  },
  {
    id: 'C1.0',
    title: 'C1.0 - Additional Criteria for Confidentiality',
    count: 2,
    items: [
      { id: 'C1.1', title: 'C1.1 - The entity identifies and maintains confidential information to meet the entity\'s objectives related to confidentiality.', controls: ['CON-01'], status: 'In Scope' },
      { id: 'C1.2', title: 'C1.2 - The entity disposes of confidential information to meet the entity\'s objectives related to confidentiality.', controls: ['CON-02'], status: 'In Scope' }
    ]
  },
  {
    id: 'PI1.0',
    title: 'PI1.0 - Additional Criteria for Processing Integrity',
    count: 5,
    items: [
      { id: 'PI1.1', title: 'PI1.1 - The entity obtains or generates, uses, and communicates relevant, quality information regarding the objectives related to processing.', controls: ['PRO-01'], status: 'In Scope' },
      { id: 'PI1.2', title: 'PI1.2 - The entity implements policies and procedures over system processing to result in products, services, and reporting to meet objectives.', controls: ['PRO-02'], status: 'In Scope' },
      { id: 'PI1.3', title: 'PI1.3 - The entity implements policies and procedures over data processing to ensure that data inputs are accurate, complete, and valid.', controls: ['PRO-03'], status: 'In Scope' },
      { id: 'PI1.4', title: 'PI1.4 - The entity implements policies and procedures over data processing to ensure that data is processed accurately, completely, and validly.', controls: ['PRO-04'], status: 'In Scope' },
      { id: 'PI1.5', title: 'PI1.5 - The entity implements policies and procedures over data processing to ensure that outputs are accurate, complete, and valid.', controls: ['PRO-05'], status: 'In Scope' }
    ]
  },
  {
    id: 'P1.0',
    title: 'P1.0 - Additional Criteria for Privacy',
    count: 8,
    items: [
      { id: 'P1.1', title: 'P1.1 - The entity provides notice to data subjects about its privacy practices to meet the entity\'s objectives related to privacy.', controls: ['PRV-01'], status: 'In Scope' },
      { id: 'P1.2', title: 'P1.2 - The entity communicates choices available regarding the collection, use, retention, disclosure, and disposal of personal information.', controls: ['PRV-02'], status: 'In Scope' },
      { id: 'P1.3', title: 'P1.3 - The entity collects personal information only for the purposes identified in the notice.', controls: ['PRV-03'], status: 'In Scope' },
      { id: 'P1.4', title: 'P1.4 - The entity limits the use of personal information to the purposes identified in the notice.', controls: ['PRV-04'], status: 'In Scope' },
      { id: 'P1.5', title: 'P1.5 - The entity retains personal information for only as long as necessary to fulfill the stated purposes.', controls: ['PRV-05'], status: 'In Scope' },
      { id: 'P1.6', title: 'P1.6 - The entity securely disposes of personal information to meet the entity\'s objectives related to privacy.', controls: ['PRV-06'], status: 'In Scope' },
      { id: 'P1.7', title: 'P1.7 - The entity grants data subjects access to their personal information for review and correction.', controls: ['PRV-07'], status: 'In Scope' },
      { id: 'P1.8', title: 'P1.8 - The entity discloses personal information to third parties only for the purposes identified in the notice and with the implicit or explicit consent of the data subject.', controls: ['PRV-08'], status: 'In Scope' }
    ]
  }
];
