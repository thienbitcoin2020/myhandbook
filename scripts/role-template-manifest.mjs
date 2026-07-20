/**
 * Reviewed master templates generated from the role prompt pack.
 *
 * PM, PO, BA and Scrum Master are intentionally excluded by product-owner
 * direction. Existing SA ADR/SAD templates remain in artifact-files.mjs; this
 * registry contains only the newly generated files.
 */

const groups = [
  {
    role: 'sa', owner: 'Solution Architect', supports: 'Dev · QC · Security · Ops',
    title: { en: 'Additional Architecture Templates', vi: 'Template kiến trúc bổ sung' },
    subtitle: { en: 'Structured master files for APIs and measurable quality attributes', vi: 'Bộ master file có cấu trúc cho API và thuộc tính chất lượng đo được' },
    documents: [
      ['api-specification', 'API Specification', 'Đặc tả API', 'Define contracts, authentication, errors, versioning and service expectations.', 'Định nghĩa contract, xác thực, lỗi, versioning và kỳ vọng dịch vụ.'],
      ['non-functional-requirements-specification', 'Non-Functional Requirements Specification', 'Đặc tả yêu cầu phi chức năng', 'Capture measurable quality attributes and their verification method.', 'Ghi nhận thuộc tính chất lượng đo được và phương pháp kiểm chứng.'],
    ],
  },
  {
    role: 'ux', owner: 'UX/UI Designer', supports: 'PO · BA · Dev · QC',
    title: { en: 'UX/UI Working Templates', vi: 'Template làm việc UX/UI' },
    subtitle: { en: 'Research, structure, design governance, validation and handoff', vi: 'Nghiên cứu, cấu trúc, quản trị thiết kế, kiểm chứng và handoff' },
    documents: [
      ['user-persona-customer-journey-map', 'User Persona & Customer Journey Map', 'User Persona & Customer Journey Map', 'Connect evidence-backed personas to stages, touchpoints and opportunities.', 'Kết nối persona có bằng chứng với giai đoạn, touchpoint và cơ hội.'],
      ['information-architecture-wireframe-brief', 'Information Architecture & Wireframe Brief', 'Information Architecture & Wireframe Brief', 'Baseline sitemap, user flow, content inventory and wireframe scope.', 'Baseline sitemap, user flow, content inventory và phạm vi wireframe.'],
      ['design-system-ui-style-guide', 'Design System / UI Style Guide', 'Design System / UI Style Guide', 'Govern tokens, components, states, accessibility and versioning.', 'Quản trị token, component, state, accessibility và versioning.'],
      ['usability-test-plan-report', 'Usability Test Plan & Report', 'Kế hoạch & báo cáo Usability Test', 'Plan tasks and participants, then record evidence and prioritized findings.', 'Lập kế hoạch task và người tham gia, sau đó ghi bằng chứng và finding ưu tiên.'],
      ['design-handoff-specification', 'Design Handoff Specification', 'Đặc tả Design Handoff', 'Give delivery teams one traceable source for screens, states and design QA.', 'Cung cấp một nguồn truy vết cho screen, state và design QA.'],
    ],
  },
  {
    role: 'qc', owner: 'QC Lead / QC Engineer', supports: 'BA · PO · Dev · PM',
    title: { en: 'QC Testing Templates', vi: 'Template kiểm thử QC' },
    subtitle: { en: 'Planning, execution, defect control, reporting and UAT', vi: 'Lập kế hoạch, thực thi, quản lý defect, báo cáo và UAT' },
    documents: [
      ['test-strategy-test-plan', 'Test Strategy & Test Plan', 'Test Strategy & Test Plan', 'Set scope, risk, levels, environments, entry and exit criteria.', 'Thiết lập scope, risk, level, môi trường, tiêu chí vào và ra.'],
      ['test-case-specification', 'Test Case Specification', 'Đặc tả Test Case', 'Turn requirements and acceptance criteria into traceable tests.', 'Chuyển requirement và acceptance criteria thành test truy vết được.'],
      ['defect-report', 'Defect Report', 'Defect Report', 'Record reproducible evidence, severity, priority and lifecycle ownership.', 'Ghi bằng chứng tái hiện, severity, priority và chủ sở hữu vòng đời.'],
      ['test-summary-report', 'Test Summary Report', 'Test Summary Report', 'Summarize execution, residual risk and release recommendation.', 'Tổng hợp thực thi, residual risk và khuyến nghị phát hành.'],
      ['uat-plan', 'UAT Plan', 'Kế hoạch UAT', 'Coordinate business scenarios, participants, evidence and sign-off.', 'Điều phối business scenario, người tham gia, bằng chứng và sign-off.'],
    ],
  },
  {
    role: 'sec', owner: 'Security / Compliance', supports: 'SA · Dev · SRE · PM',
    title: { en: 'Security & Compliance Templates', vi: 'Template Security & Compliance' },
    subtitle: { en: 'Threats, controls, risk, response and compliance evidence', vi: 'Threat, control, risk, ứng phó và bằng chứng tuân thủ' },
    documents: [
      ['threat-model-stride', 'Threat Model (STRIDE)', 'Threat Model (STRIDE)', 'Model data flows, trust boundaries, threats and mitigations.', 'Mô hình hoá data flow, trust boundary, threat và mitigation.'],
      ['security-requirements-checklist', 'Security Requirements Checklist', 'Security Requirements Checklist', 'Create verifiable security requirements for delivery and assurance.', 'Tạo yêu cầu bảo mật kiểm chứng được cho delivery và assurance.'],
      ['security-risk-assessment', 'Security Risk Assessment', 'Đánh giá rủi ro bảo mật', 'Assess scenarios, likelihood, impact, treatment and residual risk.', 'Đánh giá scenario, likelihood, impact, treatment và residual risk.'],
      ['incident-response-plan', 'Incident Response Plan', 'Kế hoạch ứng phó sự cố', 'Define roles, triggers, communications, evidence and response playbooks.', 'Định nghĩa role, trigger, communication, evidence và response playbook.'],
      ['compliance-gap-checklist', 'Compliance Gap Checklist', 'Compliance Gap Checklist', 'Map clauses to evidence, gaps, remediation and accountable owners.', 'Ánh xạ điều khoản với evidence, gap, remediation và owner chịu trách nhiệm.'],
    ],
  },
  {
    role: 'ops', owner: 'SRE / Operations', supports: 'Dev · SA · Security · PM',
    title: { en: 'Operations & SRE Templates', vi: 'Template Operations & SRE' },
    subtitle: { en: 'Reliability targets, operating procedures, learning and recovery', vi: 'Mục tiêu độ tin cậy, quy trình vận hành, học hỏi và phục hồi' },
    documents: [
      ['sli-slo-sla-document', 'SLI / SLO / SLA Document', 'Tài liệu SLI / SLO / SLA', 'Define indicators, objectives, windows and error-budget policy.', 'Định nghĩa indicator, objective, window và error-budget policy.'],
      ['operational-runbook', 'Operational Runbook', 'Operational Runbook', 'Guide diagnosis, safe action, verification and escalation.', 'Hướng dẫn chẩn đoán, hành động an toàn, kiểm chứng và escalation.'],
      ['blameless-postmortem', 'Blameless Postmortem', 'Blameless Postmortem', 'Capture timeline, contributing conditions and verified corrective actions.', 'Ghi timeline, điều kiện góp phần và corrective action được kiểm chứng.'],
      ['disaster-recovery-plan', 'Disaster Recovery Plan', 'Disaster Recovery Plan', 'Baseline recovery objectives, procedures, ownership and exercises.', 'Baseline recovery objective, procedure, owner và diễn tập.'],
    ],
  },
  {
    role: 'deployment', owner: 'DevOps / Release Engineer', supports: 'QC · Security · SRE · SA',
    title: { en: 'Deployment & DevOps Templates', vi: 'Template Deployment & DevOps' },
    subtitle: { en: 'Controlled release, rollback, pipeline and environment baselines', vi: 'Phát hành có kiểm soát, rollback, pipeline và baseline môi trường' },
    documents: [
      ['deployment-runbook-rollback-plan', 'Deployment Runbook & Rollback Plan', 'Deployment Runbook & Rollback Plan', 'Execute releases through verified steps and explicit rollback triggers.', 'Thực thi release qua bước kiểm chứng và trigger rollback rõ ràng.'],
      ['release-go-no-go-checklist', 'Release Go / No-Go Checklist', 'Release Go / No-Go Checklist', 'Collect role evidence and record one accountable release decision.', 'Thu bằng chứng từng role và ghi một quyết định release có trách nhiệm.'],
      ['ci-cd-pipeline-documentation', 'CI/CD Pipeline Documentation', 'Tài liệu CI/CD Pipeline', 'Document stages, gates, artifacts, permissions and failure behavior.', 'Tài liệu hoá stage, gate, artifact, permission và hành vi khi lỗi.'],
      ['environment-configuration-document', 'Environment Configuration Document', 'Tài liệu cấu hình môi trường', 'Compare environments without exposing secrets and control configuration drift.', 'So sánh môi trường không lộ secret và kiểm soát configuration drift.'],
    ],
  },
  {
    role: 'pmo', owner: 'PMO Lead / PMO Analyst', supports: 'Sponsor · PM · PO · Finance',
    title: { en: 'PMO Governance Templates', vi: 'Template quản trị PMO' },
    subtitle: { en: 'Decision rights, stage gates, portfolio insight and benefits', vi: 'Quyền quyết định, stage gate, insight portfolio và benefit' },
    documents: [
      ['pmo-charter-governance-framework', 'PMO Charter & Governance Framework', 'PMO Charter & Governance Framework', 'Define PMO mandate, services, decision rights, tailoring and KPIs.', 'Định nghĩa mandate, service, decision right, tailoring và KPI của PMO.'],
      ['stage-gate-review-template', 'Stage Gate Review Template', 'Stage Gate Review Template', 'Score gate evidence and record GO, conditional GO, HOLD or KILL.', 'Chấm bằng chứng gate và ghi GO, GO có điều kiện, HOLD hoặc KILL.'],
      ['portfolio-status-report', 'Portfolio Status Report', 'Portfolio Status Report', 'Give leaders a decision-focused portfolio dashboard and systemic risks.', 'Cung cấp dashboard portfolio hướng quyết định và systemic risk cho lãnh đạo.'],
      ['benefits-realization-plan', 'Benefits Realization Plan', 'Benefits Realization Plan', 'Trace outputs to owned, measurable benefits beyond go-live.', 'Trace output tới benefit có owner, đo được sau go-live.'],
    ],
  },
];

export const GENERATED_ROLE_TEMPLATE_GROUPS = Object.freeze(groups.map(group => Object.freeze({
  ...group,
  documents: Object.freeze(group.documents.map(([slug, en, vi, descriptionEn, descriptionVi]) => Object.freeze({
    slug,
    title: Object.freeze({ en, vi }),
    description: Object.freeze({ en: descriptionEn, vi: descriptionVi }),
    path: `assets/templates/${group.role}/${slug}.docx`,
    preview: `assets/templates/previews/${slug}.html`,
  }))),
})));

export const GENERATED_ROLE_DOCUMENTS = Object.freeze(
  GENERATED_ROLE_TEMPLATE_GROUPS.flatMap(group => group.documents.map(document => document.path)),
);
