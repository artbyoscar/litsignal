import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Clean existing data
  await prisma.prospectActivity.deleteMany();
  await prisma.prospectContact.deleteMany();
  await prisma.campaignMember.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.prospect.deleteMany();
  await prisma.caseParty.deleteMany();
  await prisma.trigger.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.companyAlias.deleteMany();
  await prisma.company.deleteMany();
  await prisma.alert.deleteMany();
  await prisma.user.deleteMany();
  await prisma.organization.deleteMany();

  console.log("✓ Cleaned existing data");

  // Create Organization
  const org = await prisma.organization.create({
    data: {
      name: "Apex Insurance Brokers",
      slug: "apex-insurance",
      plan: "SOLO",
      credits: 60,
      creditsUsed: 23,
      targetIndustries: ["Technology", "Manufacturing", "Healthcare", "Financial Services"],
    },
  });
  console.log("✓ Created organization");

  // Create User
  const user = await prisma.user.create({
    data: {
      clerkId: "user_placeholder",
      email: "broker@apexinsurance.com",
      name: "John Doe",
      role: "OWNER",
      organizationId: org.id,
    },
  });
  console.log("✓ Created user");

  // Create Companies
  const companies = await Promise.all([
    prisma.company.create({
      data: {
        name: "TechCorp Industries",
        legalName: "TechCorp Industries Inc.",
        domain: "techcorp.com",
        industry: "Technology",
        naicsCode: "541512",
        employeeCount: 5200,
        employeeRange: "5000-10000",
        revenue: 750000000,
        revenueRange: "$500M-1B",
        city: "San Francisco",
        state: "CA",
        country: "US",
        enrichedAt: new Date(),
      },
    }),
    prisma.company.create({
      data: {
        name: "Global Manufacturing LLC",
        legalName: "Global Manufacturing LLC",
        domain: "globalmfg.com",
        industry: "Manufacturing",
        naicsCode: "332710",
        employeeCount: 12000,
        employeeRange: "10000+",
        revenue: 2100000000,
        revenueRange: "$1B+",
        city: "Detroit",
        state: "MI",
        country: "US",
        enrichedAt: new Date(),
      },
    }),
    prisma.company.create({
      data: {
        name: "DataFlow Systems",
        legalName: "DataFlow Systems Corp",
        domain: "dataflow.io",
        industry: "Technology",
        naicsCode: "541511",
        employeeCount: 850,
        employeeRange: "500-1000",
        revenue: 95000000,
        revenueRange: "$50M-100M",
        city: "Austin",
        state: "TX",
        country: "US",
        enrichedAt: new Date(),
      },
    }),
    prisma.company.create({
      data: {
        name: "Acme Financial Services",
        legalName: "Acme Financial Services Inc",
        domain: "acmefinancial.com",
        industry: "Financial Services",
        naicsCode: "523110",
        employeeCount: 2300,
        employeeRange: "1000-5000",
        revenue: 450000000,
        revenueRange: "$100M-500M",
        city: "New York",
        state: "NY",
        country: "US",
        enrichedAt: new Date(),
      },
    }),
    prisma.company.create({
      data: {
        name: "Healthcare Plus Inc",
        legalName: "Healthcare Plus Inc",
        domain: "healthcareplus.com",
        industry: "Healthcare",
        naicsCode: "621111",
        employeeCount: 1800,
        employeeRange: "1000-5000",
        revenue: 320000000,
        revenueRange: "$100M-500M",
        city: "Houston",
        state: "TX",
        country: "US",
        enrichedAt: new Date(),
      },
    }),
    // Prospect companies (not defendants)
    prisma.company.create({
      data: {
        name: "Nexus Technologies",
        domain: "nexustech.io",
        industry: "Technology",
        employeeCount: 720,
        employeeRange: "500-1000",
        revenue: 82000000,
        revenueRange: "$50M-100M",
        city: "Austin",
        state: "TX",
        country: "US",
        enrichedAt: new Date(),
      },
    }),
    prisma.company.create({
      data: {
        name: "Pinnacle Manufacturing",
        domain: "pinnaclemfg.com",
        industry: "Manufacturing",
        employeeCount: 3200,
        employeeRange: "1000-5000",
        revenue: 280000000,
        revenueRange: "$100M-500M",
        city: "Chicago",
        state: "IL",
        country: "US",
        enrichedAt: new Date(),
      },
    }),
    prisma.company.create({
      data: {
        name: "Vertex Financial",
        domain: "vertexfin.com",
        industry: "Financial Services",
        employeeCount: 380,
        employeeRange: "200-500",
        revenue: 42000000,
        revenueRange: "$25M-50M",
        city: "New York",
        state: "NY",
        country: "US",
        enrichedAt: new Date(),
      },
    }),
    prisma.company.create({
      data: {
        name: "CloudScale Systems",
        domain: "cloudscale.io",
        industry: "Technology",
        employeeCount: 150,
        employeeRange: "100-200",
        revenue: 18000000,
        revenueRange: "$10M-25M",
        city: "Seattle",
        state: "WA",
        country: "US",
        enrichedAt: new Date(),
      },
    }),
    prisma.company.create({
      data: {
        name: "MedTech Solutions",
        domain: "medtechsolutions.com",
        industry: "Healthcare",
        employeeCount: 920,
        employeeRange: "500-1000",
        revenue: 75000000,
        revenueRange: "$50M-100M",
        city: "Boston",
        state: "MA",
        country: "US",
        enrichedAt: new Date(),
      },
    }),
  ]);
  console.log("✓ Created companies");

  // Create Contacts for prospect companies
  const contacts = await Promise.all([
    prisma.contact.create({
      data: {
        companyId: companies[5].id, // Nexus
        firstName: "Sarah",
        lastName: "Chen",
        fullName: "Sarah Chen",
        email: "schen@nexustech.io",
        title: "Chief Financial Officer",
        seniority: "C_LEVEL",
        isDecisionMaker: true,
        relevantFor: ["DO", "CYBER"],
        enrichedAt: new Date(),
      },
    }),
    prisma.contact.create({
      data: {
        companyId: companies[5].id,
        firstName: "Mike",
        lastName: "Johnson",
        fullName: "Mike Johnson",
        email: "mjohnson@nexustech.io",
        title: "VP of Human Resources",
        seniority: "VP",
        isDecisionMaker: true,
        relevantFor: ["EPLI"],
        enrichedAt: new Date(),
      },
    }),
    prisma.contact.create({
      data: {
        companyId: companies[6].id, // Pinnacle
        firstName: "Robert",
        lastName: "Williams",
        fullName: "Robert Williams",
        email: "rwilliams@pinnaclemfg.com",
        title: "Chief Executive Officer",
        seniority: "C_LEVEL",
        isDecisionMaker: true,
        relevantFor: ["DO", "EPLI"],
        enrichedAt: new Date(),
      },
    }),
    prisma.contact.create({
      data: {
        companyId: companies[7].id, // Vertex
        firstName: "Jennifer",
        lastName: "Martinez",
        fullName: "Jennifer Martinez",
        email: "jmartinez@vertexfin.com",
        title: "General Counsel",
        seniority: "C_LEVEL",
        isDecisionMaker: true,
        relevantFor: ["DO", "EO"],
        enrichedAt: new Date(),
      },
    }),
    prisma.contact.create({
      data: {
        companyId: companies[8].id, // CloudScale
        firstName: "David",
        lastName: "Park",
        fullName: "David Park",
        email: "dpark@cloudscale.io",
        title: "Chief Technology Officer",
        seniority: "C_LEVEL",
        isDecisionMaker: true,
        relevantFor: ["CYBER"],
        enrichedAt: new Date(),
      },
    }),
    prisma.contact.create({
      data: {
        companyId: companies[9].id, // MedTech
        firstName: "Lisa",
        lastName: "Thompson",
        fullName: "Lisa Thompson",
        email: "lthompson@medtechsolutions.com",
        title: "VP Risk Management",
        seniority: "VP",
        isDecisionMaker: true,
        relevantFor: ["EPLI", "EO"],
        enrichedAt: new Date(),
      },
    }),
  ]);
  console.log("✓ Created contacts");

  // Create Triggers (lawsuit cases)
  const triggers = await Promise.all([
    prisma.trigger.create({
      data: {
        organizationId: org.id,
        externalId: "cl-2024-001234",
        source: "COURTLISTENER",
        caseNumber: "1:24-cv-01234",
        courtId: "nysd",
        courtName: "Southern District of New York",
        courtType: "FEDERAL_DISTRICT",
        jurisdiction: "NY",
        title: "SEC v. TechCorp Industries Inc.",
        caseType: "Securities Fraud",
        caseCategory: "SECURITIES_FRAUD",
        filingDate: new Date("2024-01-15"),
        status: "NEW",
        plaintiffs: ["Securities and Exchange Commission"],
        defendants: ["TechCorp Industries Inc.", "John Smith (CEO)"],
        insuranceLines: ["DO"],
        relevanceScore: 95,
        relevanceReason: "SEC enforcement action against public company",
        docketUrl: "https://www.courtlistener.com/docket/12345/",
      },
    }),
    prisma.trigger.create({
      data: {
        organizationId: org.id,
        externalId: "cl-2024-005678",
        source: "COURTLISTENER",
        caseNumber: "3:24-cv-05678",
        courtId: "cand",
        courtName: "Northern District of California",
        courtType: "FEDERAL_DISTRICT",
        jurisdiction: "CA",
        title: "Johnson v. Global Manufacturing LLC",
        caseType: "Employment Discrimination",
        caseCategory: "EMPLOYMENT_DISCRIMINATION",
        filingDate: new Date("2024-01-14"),
        status: "NEW",
        plaintiffs: ["Maria Johnson"],
        defendants: ["Global Manufacturing LLC"],
        insuranceLines: ["EPLI"],
        relevanceScore: 88,
        relevanceReason: "Class action employment discrimination claim",
        docketUrl: "https://www.courtlistener.com/docket/12346/",
      },
    }),
    prisma.trigger.create({
      data: {
        organizationId: org.id,
        externalId: "cl-2024-009012",
        source: "COURTLISTENER",
        caseNumber: "1:24-cv-09012",
        courtId: "ded",
        courtName: "District of Delaware",
        courtType: "FEDERAL_DISTRICT",
        jurisdiction: "DE",
        title: "In re DataFlow Systems Data Breach Litigation",
        caseType: "Data Breach",
        caseCategory: "DATA_BREACH",
        filingDate: new Date("2024-01-13"),
        status: "REVIEWED",
        plaintiffs: ["Jane Doe", "Class Members"],
        defendants: ["DataFlow Systems Corp"],
        insuranceLines: ["CYBER"],
        relevanceScore: 92,
        relevanceReason: "Major data breach affecting 500k+ users",
        docketUrl: "https://www.courtlistener.com/docket/12347/",
      },
    }),
    prisma.trigger.create({
      data: {
        organizationId: org.id,
        externalId: "cl-2024-003456",
        source: "COURTLISTENER",
        caseNumber: "2:24-cv-03456",
        courtId: "cacd",
        courtName: "Central District of California",
        courtType: "FEDERAL_DISTRICT",
        jurisdiction: "CA",
        title: "Shareholders v. Acme Financial Services Inc.",
        caseType: "Shareholder Derivative",
        caseCategory: "SHAREHOLDER_DERIVATIVE",
        filingDate: new Date("2024-01-12"),
        status: "REVIEWED",
        plaintiffs: ["Pension Fund of America", "Shareholder Class"],
        defendants: ["Acme Financial Services Inc.", "Board of Directors"],
        insuranceLines: ["DO"],
        relevanceScore: 90,
        relevanceReason: "Derivative action against board of directors",
        docketUrl: "https://www.courtlistener.com/docket/12348/",
      },
    }),
    prisma.trigger.create({
      data: {
        organizationId: org.id,
        externalId: "cl-2024-007890",
        source: "COURTLISTENER",
        caseNumber: "1:24-cv-07890",
        courtId: "txsd",
        courtName: "Southern District of Texas",
        courtType: "FEDERAL_DISTRICT",
        jurisdiction: "TX",
        title: "EEOC v. Healthcare Plus Inc.",
        caseType: "EPLI",
        caseCategory: "WRONGFUL_TERMINATION",
        filingDate: new Date("2024-01-11"),
        status: "ARCHIVED",
        plaintiffs: ["Equal Employment Opportunity Commission"],
        defendants: ["Healthcare Plus Inc."],
        insuranceLines: ["EPLI"],
        relevanceScore: 85,
        relevanceReason: "EEOC enforcement action for wrongful termination pattern",
        docketUrl: "https://www.courtlistener.com/docket/12349/",
      },
    }),
  ]);
  console.log("✓ Created triggers");

  // Create Case Parties
  await Promise.all([
    prisma.caseParty.create({
      data: {
        triggerId: triggers[0].id,
        role: "DEFENDANT",
        name: "TechCorp Industries Inc.",
        partyType: "CORPORATION",
        companyId: companies[0].id,
        matchScore: 98,
        matchStatus: "CONFIRMED",
      },
    }),
    prisma.caseParty.create({
      data: {
        triggerId: triggers[1].id,
        role: "DEFENDANT",
        name: "Global Manufacturing LLC",
        partyType: "LLC",
        companyId: companies[1].id,
        matchScore: 95,
        matchStatus: "CONFIRMED",
      },
    }),
    prisma.caseParty.create({
      data: {
        triggerId: triggers[2].id,
        role: "DEFENDANT",
        name: "DataFlow Systems Corp",
        partyType: "CORPORATION",
        companyId: companies[2].id,
        matchScore: 97,
        matchStatus: "CONFIRMED",
      },
    }),
    prisma.caseParty.create({
      data: {
        triggerId: triggers[3].id,
        role: "DEFENDANT",
        name: "Acme Financial Services Inc.",
        partyType: "CORPORATION",
        companyId: companies[3].id,
        matchScore: 99,
        matchStatus: "CONFIRMED",
      },
    }),
    prisma.caseParty.create({
      data: {
        triggerId: triggers[4].id,
        role: "DEFENDANT",
        name: "Healthcare Plus Inc.",
        partyType: "CORPORATION",
        companyId: companies[4].id,
        matchScore: 96,
        matchStatus: "CONFIRMED",
      },
    }),
  ]);
  console.log("✓ Created case parties");

  // Create Prospects
  const prospects = await Promise.all([
    prisma.prospect.create({
      data: {
        organizationId: org.id,
        triggerId: triggers[0].id, // TechCorp securities fraud
        companyId: companies[5].id, // Nexus Technologies
        prospectType: "PEER",
        insuranceLines: ["DO", "CYBER"],
        qualityScore: 88,
        urgencyScore: 95,
        fitScore: 92,
        overallScore: 92,
        status: "CONTACTED",
        assignedToId: user.id,
        contactedAt: new Date("2024-01-16"),
        notes: "Scheduled call for next week to discuss D&O coverage.",
      },
    }),
    prisma.prospect.create({
      data: {
        organizationId: org.id,
        triggerId: triggers[1].id, // Global Mfg EPLI
        companyId: companies[6].id, // Pinnacle Manufacturing
        prospectType: "PEER",
        insuranceLines: ["EPLI"],
        qualityScore: 85,
        urgencyScore: 88,
        fitScore: 90,
        overallScore: 87,
        status: "QUALIFIED",
        assignedToId: user.id,
        contactedAt: new Date("2024-01-15"),
        notes: "Interested in EPLI review. Current policy expires Q2.",
      },
    }),
    prisma.prospect.create({
      data: {
        organizationId: org.id,
        triggerId: triggers[3].id, // Acme D&O
        companyId: companies[7].id, // Vertex Financial
        prospectType: "PEER",
        insuranceLines: ["DO", "EO"],
        qualityScore: 80,
        urgencyScore: 75,
        fitScore: 82,
        overallScore: 78,
        status: "CONTACTED",
        assignedToId: user.id,
      },
    }),
    prisma.prospect.create({
      data: {
        organizationId: org.id,
        triggerId: triggers[2].id, // DataFlow data breach
        companyId: companies[8].id, // CloudScale
        prospectType: "PEER",
        insuranceLines: ["CYBER"],
        qualityScore: 70,
        urgencyScore: 85,
        fitScore: 60,
        overallScore: 65,
        status: "NEW",
      },
    }),
    prisma.prospect.create({
      data: {
        organizationId: org.id,
        triggerId: triggers[4].id, // Healthcare Plus EPLI
        companyId: companies[9].id, // MedTech Solutions
        prospectType: "PEER",
        insuranceLines: ["EPLI", "EO"],
        qualityScore: 60,
        urgencyScore: 55,
        fitScore: 65,
        overallScore: 54,
        status: "NEW",
        assignedToId: user.id,
      },
    }),
  ]);
  console.log("✓ Created prospects");

  // Create Prospect Contacts
  await Promise.all([
    prisma.prospectContact.create({
      data: {
        prospectId: prospects[0].id,
        contactId: contacts[0].id, // Sarah Chen at Nexus
        isPrimary: true,
      },
    }),
    prisma.prospectContact.create({
      data: {
        prospectId: prospects[0].id,
        contactId: contacts[1].id, // Mike Johnson at Nexus
        isPrimary: false,
      },
    }),
    prisma.prospectContact.create({
      data: {
        prospectId: prospects[1].id,
        contactId: contacts[2].id, // Robert Williams at Pinnacle
        isPrimary: true,
      },
    }),
    prisma.prospectContact.create({
      data: {
        prospectId: prospects[2].id,
        contactId: contacts[3].id, // Jennifer Martinez at Vertex
        isPrimary: true,
      },
    }),
    prisma.prospectContact.create({
      data: {
        prospectId: prospects[3].id,
        contactId: contacts[4].id, // David Park at CloudScale
        isPrimary: true,
      },
    }),
    prisma.prospectContact.create({
      data: {
        prospectId: prospects[4].id,
        contactId: contacts[5].id, // Lisa Thompson at MedTech
        isPrimary: true,
      },
    }),
  ]);
  console.log("✓ Created prospect contacts");

  // Create Campaigns
  const campaigns = await Promise.all([
    prisma.campaign.create({
      data: {
        organizationId: org.id,
        name: "Q1 D&O Outreach",
        description: "Targeting tech companies after securities fraud cases",
        status: "ACTIVE",
        subject: "Protecting Your Board After Recent SEC Actions",
        prospectCount: 45,
        sentCount: 32,
        openedCount: 18,
        repliedCount: 5,
        createdById: user.id,
      },
    }),
    prisma.campaign.create({
      data: {
        organizationId: org.id,
        name: "Tech Sector Cyber Liability",
        description: "Following up on data breach cases",
        status: "ACTIVE",
        subject: "Is Your Company Protected from Data Breach Liability?",
        prospectCount: 28,
        sentCount: 28,
        openedCount: 12,
        repliedCount: 3,
        createdById: user.id,
      },
    }),
    prisma.campaign.create({
      data: {
        organizationId: org.id,
        name: "Manufacturing EPLI Push",
        description: "Employment practices outreach to manufacturing sector",
        status: "PAUSED",
        subject: "Employment Litigation is Rising in Manufacturing",
        prospectCount: 56,
        sentCount: 40,
        openedCount: 22,
        repliedCount: 8,
        createdById: user.id,
      },
    }),
    prisma.campaign.create({
      data: {
        organizationId: org.id,
        name: "Healthcare D&O Campaign",
        description: "Draft campaign for healthcare D&O outreach",
        status: "DRAFT",
        subject: "D&O Coverage for Healthcare Executives",
        prospectCount: 33,
        sentCount: 0,
        openedCount: 0,
        repliedCount: 0,
        createdById: user.id,
      },
    }),
  ]);
  console.log("✓ Created campaigns");

  // Add prospects to campaigns
  await Promise.all([
    prisma.campaignMember.create({
      data: {
        campaignId: campaigns[0].id,
        prospectId: prospects[0].id,
        status: "OPENED",
        sentAt: new Date("2024-01-16"),
        openedAt: new Date("2024-01-16"),
      },
    }),
    prisma.campaignMember.create({
      data: {
        campaignId: campaigns[1].id,
        prospectId: prospects[3].id,
        status: "SENT",
        sentAt: new Date("2024-01-14"),
      },
    }),
    prisma.campaignMember.create({
      data: {
        campaignId: campaigns[2].id,
        prospectId: prospects[1].id,
        status: "REPLIED",
        sentAt: new Date("2024-01-10"),
        openedAt: new Date("2024-01-10"),
        repliedAt: new Date("2024-01-12"),
      },
    }),
  ]);
  console.log("✓ Created campaign members");

  // Create Alerts
  await Promise.all([
    prisma.alert.create({
      data: {
        organizationId: org.id,
        name: "Tech Securities Fraud",
        description: "Alert for securities fraud cases in tech industry",
        status: "ACTIVE",
        caseCategories: ["SECURITIES_FRAUD", "SHAREHOLDER_DERIVATIVE"],
        insuranceLines: ["DO"],
        industries: ["Technology"],
        frequency: "IMMEDIATE",
        triggerCount: 12,
        lastTriggeredAt: new Date("2024-01-15"),
        createdById: user.id,
      },
    }),
    prisma.alert.create({
      data: {
        organizationId: org.id,
        name: "Large Company EPLI",
        description: "EPLI cases at companies with 1000+ employees",
        status: "ACTIVE",
        caseCategories: ["EMPLOYMENT_DISCRIMINATION", "WRONGFUL_TERMINATION", "SEXUAL_HARASSMENT"],
        insuranceLines: ["EPLI"],
        minCompanySize: 1000,
        frequency: "DAILY_DIGEST",
        triggerCount: 8,
        lastTriggeredAt: new Date("2024-01-14"),
        createdById: user.id,
      },
    }),
    prisma.alert.create({
      data: {
        organizationId: org.id,
        name: "Healthcare Data Breach",
        description: "Data breach and HIPAA cases in healthcare",
        status: "PAUSED",
        caseCategories: ["DATA_BREACH", "HIPAA_VIOLATION"],
        insuranceLines: ["CYBER"],
        industries: ["Healthcare"],
        frequency: "IMMEDIATE",
        triggerCount: 5,
        lastTriggeredAt: new Date("2024-01-10"),
        createdById: user.id,
      },
    }),
  ]);
  console.log("✓ Created alerts");

  // Create some prospect activities
  await Promise.all([
    prisma.prospectActivity.create({
      data: {
        prospectId: prospects[0].id,
        type: "VIEWED",
        description: "Prospect viewed",
        createdAt: new Date("2024-01-15"),
      },
    }),
    prisma.prospectActivity.create({
      data: {
        prospectId: prospects[0].id,
        type: "EMAILED",
        description: "Initial outreach email sent",
        createdAt: new Date("2024-01-16"),
      },
    }),
    prisma.prospectActivity.create({
      data: {
        prospectId: prospects[0].id,
        type: "STATUS_CHANGED",
        description: "Status changed to CONTACTED",
        createdAt: new Date("2024-01-16"),
      },
    }),
    prisma.prospectActivity.create({
      data: {
        prospectId: prospects[1].id,
        type: "CALLED",
        description: "Discovery call completed",
        createdAt: new Date("2024-01-17"),
      },
    }),
    prisma.prospectActivity.create({
      data: {
        prospectId: prospects[1].id,
        type: "STATUS_CHANGED",
        description: "Status changed to QUALIFIED",
        createdAt: new Date("2024-01-17"),
      },
    }),
  ]);
  console.log("✓ Created prospect activities");

  console.log("\n✅ Seed completed successfully!");
  console.log(`
Summary:
- 1 Organization
- 1 User
- 10 Companies
- 6 Contacts
- 5 Triggers (lawsuit cases)
- 5 Prospects
- 4 Campaigns
- 3 Alerts
  `);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
