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
  { id:3, abbr:'MAS', name:'MAS TRM 2021', color:'#7c3aed', pct:31.1, policies:100, evidence:3, tests:51.5 },
];
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
