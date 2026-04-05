// Auto-generated composition registry for freelancer-templates.org
// All 330+ freelancer template compositions, 1280x720 @ 30fps unless noted.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FC = React.FC<any>;

export interface CompSpec {
  id: string;
  component: FC;
  durationInFrames: number;
  fps: number;
  width: number;
  height: number;
  category: string;
}

// Standard defaults
const STD = { fps: 30, width: 1280, height: 720, durationInFrames: 300 } as const;

// ── Imports ──────────────────────────────────────────────────────

import { TestimonialDarkCentered, TestimonialCleanSplit, TestimonialBoldEditorial, TestimonialWarmCentered, TestimonialMinimalEditorial, TestimonialNeonSplit } from "@templates/testimonial/TestimonialShowcase";
import { RecapDarkDashboard, RecapCleanTimeline, RecapBoldCards, RecapWarmDashboard, RecapMinimalCards, RecapNeonTimeline } from "@templates/recap/RecapShowcase";
import { EventDarkHero, EventCleanSpeakers, EventBoldCountdown, EventWarmHero, EventMinimalSpeakers, EventNeonCountdown } from "@templates/event/EventShowcase";
import { ProposalDarkExecutive, ProposalCleanCreative, ProposalBoldPitch, ProposalWarmExecutive, ProposalMinimalCreative, ProposalNeonPitch } from "@templates/proposal/ProposalShowcase";
import { ExplainerDarkCinematic, ExplainerCleanWhiteboard, ExplainerBoldProcess, ExplainerWarmWhiteboard, ExplainerMinimalProcess, ExplainerNeonCinematic } from "@templates/explainer/ExplainerShowcase";
import { PortfolioDarkGallery, PortfolioCleanCaseStudy, PortfolioBoldReel, PortfolioWarmGallery, PortfolioMinimalCaseStudy, PortfolioNeonReel } from "@templates/portfolio/PortfolioShowcase";
import { OnboardingDarkProfessional, OnboardingCleanProfessional, OnboardingBoldCreative, OnboardingWarmFriendly, OnboardingMinimalProfessional, OnboardingNeonCreative } from "@templates/onboarding/OnboardingShowcase";
import { InvoiceDarkProfessional, InvoiceCleanProfessional, InvoiceBoldUrgent, InvoiceWarmFriendly, InvoiceMinimalProfessional, InvoiceNeonUrgent } from "@templates/invoice/InvoiceShowcase";
import { SocialProofDarkMilestone, SocialProofCleanAchievement, SocialProofBoldAnnouncement, SocialProofWarmMilestone, SocialProofMinimalAchievement, SocialProofNeonAnnouncement } from "@templates/socialproof/SocialProofShowcase";
import { CaseStudyDarkNarrative, CaseStudyCleanComparison, CaseStudyBoldSpotlight, CaseStudyWarmNarrative, CaseStudyMinimalComparison, CaseStudyNeonSpotlight } from "@templates/casestudy/CaseStudyShowcase";
import { PricingDarkTiers, PricingCleanComparison, PricingBoldSpotlight, PricingWarmTiers, PricingMinimalComparison, PricingNeonSpotlight } from "@templates/pricing/PricingShowcase";
import { FAQDarkAccordion, FAQCleanCards, FAQBoldInterview, FAQWarmAccordion, FAQMinimalCards, FAQNeonInterview } from "@templates/faq/FAQShowcase";
import { MilestoneDarkCelebration, MilestoneCleanJourney, MilestoneBoldCelebration, MilestoneWarmGratitude, MilestoneMinimalJourney, MilestoneNeonCelebration } from "@templates/milestone/MilestoneShowcase";
import { ProductLaunchDarkHeroReveal, ProductLaunchBoldHeroReveal, ProductLaunchDarkFeatureGrid, ProductLaunchBoldFeatureGrid, ProductLaunchDarkCountdown, ProductLaunchBoldCountdown } from "@templates/productlaunch/ProductLaunchShowcase";
import { TutorialDarkNumberedSteps, TutorialCleanNumberedSteps, TutorialDarkCardSequence, TutorialCleanCardSequence, TutorialDarkSplitDemo, TutorialCleanSplitDemo } from "@templates/tutorial/TutorialShowcase";
import { BeforeAfterDarkSplitScreen, BeforeAfterWarmSplitScreen, BeforeAfterDarkRevealWipe, BeforeAfterWarmRevealWipe, BeforeAfterDarkMetricsCompare, BeforeAfterWarmMetricsCompare } from "@templates/beforeafter/BeforeAfterShowcase";
import { CoursePromoDarkOverview, CoursePromoCleanOverview, CoursePromoDarkCurriculum, CoursePromoCleanCurriculum, CoursePromoDarkInstructor, CoursePromoCleanInstructor } from "@templates/coursepromo/CoursePromoShowcase";
import { CountdownHypeDarkTimer, CountdownHypeNeonTimer, CountdownHypeDarkTeaser, CountdownHypeNeonTeaser, CountdownHypeDarkUrgency, CountdownHypeNeonUrgency } from "@templates/countdownhype/CountdownHypeShowcase";
import { AffiliateReviewDarkScorecard, AffiliateReviewBoldScorecard, AffiliateReviewDarkComparison, AffiliateReviewBoldComparison, AffiliateReviewDarkVerdict, AffiliateReviewBoldVerdict } from "@templates/affiliatereview/AffiliateReviewShowcase";
import { PollQuizDarkQuestionCard, PollQuizNeonQuestionCard, PollQuizDarkResultsBar, PollQuizNeonResultsBar, PollQuizDarkReveal, PollQuizNeonReveal } from "@templates/pollquiz/PollQuizShowcase";
import { NewsletterPromoDarkSubscribeCta, NewsletterPromoCleanSubscribeCta, NewsletterPromoDarkIssuePreview, NewsletterPromoCleanIssuePreview, NewsletterPromoDarkTestimonialBlend, NewsletterPromoCleanTestimonialBlend } from "@templates/newsletterpromo/NewsletterPromoShowcase";
import { PodcastAudiogramDarkWaveform, PodcastAudiogramWarmWaveform, PodcastAudiogramDarkQuoteCard, PodcastAudiogramWarmQuoteCard, PodcastAudiogramDarkEpisodePromo, PodcastAudiogramWarmEpisodePromo } from "@templates/podcastaudiogram/PodcastAudiogramShowcase";
import { BehindTheScenesDarkSceneCards, BehindTheScenesWarmSceneCards, BehindTheScenesDarkTimeline, BehindTheScenesWarmTimeline, BehindTheScenesDarkProcessFlow, BehindTheScenesWarmProcessFlow } from "@templates/behindthescenes/BehindTheScenesShowcase";
import { RecipeStepWarmIngredientList, RecipeStepCleanIngredientList, RecipeStepWarmStepSequence, RecipeStepCleanStepSequence, RecipeStepWarmSummaryCard, RecipeStepCleanSummaryCard } from "@templates/recipestep/RecipeStepShowcase";
import { ListingCleanShowcase, ListingMinimalShowcase, ListingCleanFeatureGrid, ListingMinimalFeatureGrid, ListingCleanComparison, ListingMinimalComparison } from "@templates/listing/ListingShowcase";
import { FitnessRoutineBoldExerciseList, FitnessRoutineNeonExerciseList, FitnessRoutineBoldTimerFocus, FitnessRoutineNeonTimerFocus, FitnessRoutineBoldCircuit, FitnessRoutineNeonCircuit } from "@templates/fitnessroutine/FitnessRoutineShowcase";
import { MusicVisualizerDarkBars, MusicVisualizerNeonBars, MusicVisualizerDarkRadial, MusicVisualizerNeonRadial, MusicVisualizerDarkLyrics, MusicVisualizerNeonLyrics } from "@templates/musicvisualizer/MusicVisualizerShowcase";
import { CollaborationDarkSplitScreen, CollaborationBoldSplitScreen, CollaborationDarkAnnouncement, CollaborationBoldAnnouncement, CollaborationDarkStatsMerge, CollaborationBoldStatsMerge } from "@templates/collaboration/CollaborationShowcase";
import { SprintDashboardKanbanDark, SprintDashboardKanbanBold, SprintDashboardVelocityDark, SprintDashboardVelocityBold, SprintDashboardBurndownDark, SprintDashboardBurndownBold } from "@templates/sprintdashboard/SprintDashboardShowcase";
import { FeatureRoadmapTimelineDark, FeatureRoadmapTimelineClean, FeatureRoadmapSwimlaneDark, FeatureRoadmapSwimlaneClean, FeatureRoadmapGridDark, FeatureRoadmapGridClean } from "@templates/featureroadmap/FeatureRoadmapShowcase";
import { PlatformOverviewCommandCenterDark, PlatformOverviewCommandCenterNeon, PlatformOverviewModuleGridDark, PlatformOverviewModuleGridNeon, PlatformOverviewStackDark, PlatformOverviewStackNeon } from "@templates/platformoverview/PlatformOverviewShowcase";
import { AgentDashboardControlPanelDark, AgentDashboardControlPanelNeon, AgentDashboardFlowDark, AgentDashboardFlowNeon, AgentDashboardMatrixDark, AgentDashboardMatrixNeon } from "@templates/agentdashboard/AgentDashboardShowcase";
import { ClientPipelineFunnelDark, ClientPipelineFunnelWarm, ClientPipelinePipelineBoardDark, ClientPipelinePipelineBoardWarm, ClientPipelineMetricsDark, ClientPipelineMetricsWarm } from "@templates/clientpipeline/ClientPipelineShowcase";
import { IntegrationStatusStatusWallDark, IntegrationStatusStatusWallClean, IntegrationStatusCategoryGroupsDark, IntegrationStatusCategoryGroupsClean, IntegrationStatusHealthMonitorDark, IntegrationStatusHealthMonitorClean } from "@templates/integrationstatus/IntegrationStatusShowcase";
import { BugTrackerSeverityMatrixDark, BugTrackerSeverityMatrixBold, BugTrackerTriageBoardDark, BugTrackerTriageBoardBold, BugTrackerOverviewDark, BugTrackerOverviewBold } from "@templates/bugtracker/BugTrackerShowcase";
import { ReleaseNotesChangelogDark, ReleaseNotesChangelogClean, ReleaseNotesHighlightsDark, ReleaseNotesHighlightsClean, ReleaseNotesVersionCompareDark, ReleaseNotesVersionCompareClean } from "@templates/releasenotes/ReleaseNotesShowcase";
import { EffortTrackingTeamAllocationDark, EffortTrackingTeamAllocationWarm, EffortTrackingCapacityDark, EffortTrackingCapacityWarm, EffortTrackingBreakdownDark, EffortTrackingBreakdownWarm } from "@templates/efforttracking/EffortTrackingShowcase";
import { PinCollectionCardGalleryWarm, PinCollectionCardGalleryClean, PinCollectionMapListWarm, PinCollectionMapListClean, PinCollectionCategoryGridWarm, PinCollectionCategoryGridClean } from "@templates/pincollection/PinCollectionShowcase";
import { OfficeDirectoryWorldViewDark, OfficeDirectoryWorldViewClean, OfficeDirectoryCardListDark, OfficeDirectoryCardListClean, OfficeDirectoryRegionGroupsDark, OfficeDirectoryRegionGroupsClean } from "@templates/officedirectory/OfficeDirectoryShowcase";
import { TravelItineraryDayByDayWarm, TravelItineraryDayByDayBold, TravelItineraryRouteOverviewWarm, TravelItineraryRouteOverviewBold, TravelItineraryHighlightsWarm, TravelItineraryHighlightsBold } from "@templates/travelitinerary/TravelItineraryShowcase";
import { StoreLocatorFinderClean, StoreLocatorFinderMinimal, StoreLocatorMapPinsClean, StoreLocatorMapPinsMinimal, StoreLocatorDirectoryClean, StoreLocatorDirectoryMinimal } from "@templates/storelocator/StoreLocatorShowcase";
import { NeighborhoodGuideExplorerWarm, NeighborhoodGuideExplorerNeon, NeighborhoodGuideHighlightsReelWarm, NeighborhoodGuideHighlightsReelNeon, NeighborhoodGuideOverviewWarm, NeighborhoodGuideOverviewNeon } from "@templates/neighborhoodguide/NeighborhoodGuideShowcase";
import { EventVenueScheduleMapDark, EventVenueScheduleMapBold, EventVenueVenueCardsDark, EventVenueVenueCardsBold, EventVenueEventOverviewDark, EventVenueEventOverviewBold } from "@templates/eventvenue/EventVenueShowcase";
import { SprintRecapShippedListDark, SprintRecapShippedListBold, SprintRecapHighlightCardsDark, SprintRecapHighlightCardsBold, SprintRecapTeamContributionsDark, SprintRecapTeamContributionsBold } from "@templates/sprintrecap/SprintRecapShowcase";
import { DeploymentStatusEnvironmentCardsDark, DeploymentStatusEnvironmentCardsNeon, DeploymentStatusPipelineViewDark, DeploymentStatusPipelineViewNeon, DeploymentStatusHealthDashboardDark, DeploymentStatusHealthDashboardNeon } from "@templates/deploymentstatus/DeploymentStatusShowcase";
import { VelocityChartBarChartDark, VelocityChartBarChartClean, VelocityChartTrendLineDark, VelocityChartTrendLineClean, VelocityChartSummaryDark, VelocityChartSummaryClean } from "@templates/velocitychart/VelocityChartShowcase";
import { QBRDashboardExecutiveDark, QBRDashboardExecutiveClean, QBRDashboardDetailedDark, QBRDashboardDetailedClean, QBRDashboardComparisonDark, QBRDashboardComparisonClean } from "@templates/qbrdashboard/QBRDashboardShowcase";
import { ProjectHealthHealthScorecardDark, ProjectHealthHealthScorecardWarm, ProjectHealthWorkstreamViewDark, ProjectHealthWorkstreamViewWarm, ProjectHealthExecutiveSummaryDark, ProjectHealthExecutiveSummaryWarm } from "@templates/projecthealth/ProjectHealthShowcase";
import { FeatureFlagsExperimentBoardDark, FeatureFlagsExperimentBoardNeon, FeatureFlagsResultsViewDark, FeatureFlagsResultsViewNeon, FeatureFlagsRolloutTrackerDark, FeatureFlagsRolloutTrackerNeon } from "@templates/featureflags/FeatureFlagsShowcase";
import { BugTriagePriorityColumnsDark, BugTriagePriorityColumnsBold, BugTriageTriageListDark, BugTriageTriageListBold, BugTriageSummaryDashboardDark, BugTriageSummaryDashboardBold } from "@templates/bugtriage/BugTriageShowcase";
import { ComponentInventoryArchitectureGridDark, ComponentInventoryArchitectureGridClean, ComponentInventoryDependencyMapDark, ComponentInventoryDependencyMapClean, ComponentInventoryInventoryListDark, ComponentInventoryInventoryListClean } from "@templates/componentinventory/ComponentInventoryShowcase";
import { ConceptPitchArcDark, ConceptPitchArcBold, ConceptPitchBoardDark, ConceptPitchBoardBold, ConceptPitchBriefDark, ConceptPitchBriefBold } from "@templates/conceptpitch/ConceptPitchShowcase";
import { ThoughtLeadershipEditorialDark, ThoughtLeadershipEditorialClean, ThoughtLeadershipNarrativeDark, ThoughtLeadershipNarrativeClean, ThoughtLeadershipKeynoteDark, ThoughtLeadershipKeynoteClean } from "@templates/thoughtleadership/ThoughtLeadershipShowcase";
import { VideoFlowPipelineTutorial } from "@templates/youtubetuorial/tutorials/VideoFlowPipeline";

// ── Registry ─────────────────────────────────────────────────────

function c(id: string, component: FC, cat: string, dur = 300): CompSpec {
  return { id, component, category: cat, durationInFrames: dur, ...STD };
}

export const COMPOSITIONS: CompSpec[] = [
  // Testimonial
  c("Testimonial-DarkCentered",    TestimonialDarkCentered,    "testimonial"),
  c("Testimonial-CleanSplit",      TestimonialCleanSplit,      "testimonial"),
  c("Testimonial-BoldEditorial",   TestimonialBoldEditorial,   "testimonial"),
  c("Testimonial-WarmCentered",    TestimonialWarmCentered,    "testimonial"),
  c("Testimonial-MinimalEditorial",TestimonialMinimalEditorial,"testimonial"),
  c("Testimonial-NeonSplit",       TestimonialNeonSplit,       "testimonial"),

  // Recap
  c("Recap-DarkDashboard",  RecapDarkDashboard,  "recap"),
  c("Recap-CleanTimeline",  RecapCleanTimeline,  "recap"),
  c("Recap-BoldCards",      RecapBoldCards,      "recap"),
  c("Recap-WarmDashboard",  RecapWarmDashboard,  "recap"),
  c("Recap-MinimalCards",   RecapMinimalCards,   "recap"),
  c("Recap-NeonTimeline",   RecapNeonTimeline,   "recap"),

  // Event
  c("Event-DarkHero",       EventDarkHero,       "event"),
  c("Event-CleanSpeakers",  EventCleanSpeakers,  "event"),
  c("Event-BoldCountdown",  EventBoldCountdown,  "event"),
  c("Event-WarmHero",       EventWarmHero,       "event"),
  c("Event-MinimalSpeakers",EventMinimalSpeakers,"event"),
  c("Event-NeonCountdown",  EventNeonCountdown,  "event"),

  // Proposal
  c("Proposal-DarkExecutive",  ProposalDarkExecutive,  "proposal"),
  c("Proposal-CleanCreative",  ProposalCleanCreative,  "proposal"),
  c("Proposal-BoldPitch",      ProposalBoldPitch,      "proposal"),
  c("Proposal-WarmExecutive",  ProposalWarmExecutive,  "proposal"),
  c("Proposal-MinimalCreative",ProposalMinimalCreative,"proposal"),
  c("Proposal-NeonPitch",      ProposalNeonPitch,      "proposal"),

  // Explainer
  c("Explainer-DarkCinematic",  ExplainerDarkCinematic,  "explainer"),
  c("Explainer-CleanWhiteboard",ExplainerCleanWhiteboard,"explainer"),
  c("Explainer-BoldProcess",    ExplainerBoldProcess,    "explainer"),
  c("Explainer-WarmWhiteboard", ExplainerWarmWhiteboard, "explainer"),
  c("Explainer-MinimalProcess", ExplainerMinimalProcess, "explainer"),
  c("Explainer-NeonCinematic",  ExplainerNeonCinematic,  "explainer"),

  // Portfolio
  c("Portfolio-DarkGallery",     PortfolioDarkGallery,     "portfolio"),
  c("Portfolio-CleanCaseStudy",  PortfolioCleanCaseStudy,  "portfolio"),
  c("Portfolio-BoldReel",        PortfolioBoldReel,        "portfolio"),
  c("Portfolio-WarmGallery",     PortfolioWarmGallery,     "portfolio"),
  c("Portfolio-MinimalCaseStudy",PortfolioMinimalCaseStudy,"portfolio"),
  c("Portfolio-NeonReel",        PortfolioNeonReel,        "portfolio"),

  // Onboarding
  c("Onboarding-DarkProfessional",  OnboardingDarkProfessional,  "onboarding"),
  c("Onboarding-CleanProfessional", OnboardingCleanProfessional, "onboarding"),
  c("Onboarding-BoldCreative",      OnboardingBoldCreative,      "onboarding"),
  c("Onboarding-WarmFriendly",      OnboardingWarmFriendly,      "onboarding"),
  c("Onboarding-MinimalProfessional",OnboardingMinimalProfessional,"onboarding"),
  c("Onboarding-NeonCreative",      OnboardingNeonCreative,      "onboarding"),

  // Invoice
  c("Invoice-DarkProfessional",  InvoiceDarkProfessional,  "invoice"),
  c("Invoice-CleanProfessional", InvoiceCleanProfessional, "invoice"),
  c("Invoice-BoldUrgent",        InvoiceBoldUrgent,        "invoice"),
  c("Invoice-WarmFriendly",      InvoiceWarmFriendly,      "invoice"),
  c("Invoice-MinimalProfessional",InvoiceMinimalProfessional,"invoice"),
  c("Invoice-NeonUrgent",        InvoiceNeonUrgent,        "invoice"),

  // Social Proof
  c("SocialProof-DarkMilestone",    SocialProofDarkMilestone,    "socialproof"),
  c("SocialProof-CleanAchievement", SocialProofCleanAchievement, "socialproof"),
  c("SocialProof-BoldAnnouncement", SocialProofBoldAnnouncement, "socialproof"),
  c("SocialProof-WarmMilestone",    SocialProofWarmMilestone,    "socialproof"),
  c("SocialProof-MinimalAchievement",SocialProofMinimalAchievement,"socialproof"),
  c("SocialProof-NeonAnnouncement", SocialProofNeonAnnouncement, "socialproof"),

  // Case Study
  c("CaseStudy-DarkNarrative",   CaseStudyDarkNarrative,   "casestudy"),
  c("CaseStudy-CleanComparison", CaseStudyCleanComparison, "casestudy"),
  c("CaseStudy-BoldSpotlight",   CaseStudyBoldSpotlight,   "casestudy"),
  c("CaseStudy-WarmNarrative",   CaseStudyWarmNarrative,   "casestudy"),
  c("CaseStudy-MinimalComparison",CaseStudyMinimalComparison,"casestudy"),
  c("CaseStudy-NeonSpotlight",   CaseStudyNeonSpotlight,   "casestudy"),

  // Pricing
  c("Pricing-DarkTiers",      PricingDarkTiers,      "pricing"),
  c("Pricing-CleanComparison",PricingCleanComparison,"pricing"),
  c("Pricing-BoldSpotlight",  PricingBoldSpotlight,  "pricing"),
  c("Pricing-WarmTiers",      PricingWarmTiers,      "pricing"),
  c("Pricing-MinimalComparison",PricingMinimalComparison,"pricing"),
  c("Pricing-NeonSpotlight",  PricingNeonSpotlight,  "pricing"),

  // FAQ
  c("FAQ-DarkAccordion", FAQDarkAccordion, "faq"),
  c("FAQ-CleanCards",    FAQCleanCards,    "faq"),
  c("FAQ-BoldInterview", FAQBoldInterview, "faq"),
  c("FAQ-WarmAccordion", FAQWarmAccordion, "faq"),
  c("FAQ-MinimalCards",  FAQMinimalCards,  "faq"),
  c("FAQ-NeonInterview", FAQNeonInterview, "faq"),

  // Milestone
  c("Milestone-DarkCelebration", MilestoneDarkCelebration, "milestone"),
  c("Milestone-CleanJourney",    MilestoneCleanJourney,    "milestone"),
  c("Milestone-BoldCelebration", MilestoneBoldCelebration, "milestone"),
  c("Milestone-WarmGratitude",   MilestoneWarmGratitude,   "milestone"),
  c("Milestone-MinimalJourney",  MilestoneMinimalJourney,  "milestone"),
  c("Milestone-NeonCelebration", MilestoneNeonCelebration, "milestone"),

  // Product Launch
  c("ProductLaunch-DarkHeroReveal",  ProductLaunchDarkHeroReveal,  "productlaunch"),
  c("ProductLaunch-BoldHeroReveal",  ProductLaunchBoldHeroReveal,  "productlaunch"),
  c("ProductLaunch-DarkFeatureGrid", ProductLaunchDarkFeatureGrid, "productlaunch"),
  c("ProductLaunch-BoldFeatureGrid", ProductLaunchBoldFeatureGrid, "productlaunch"),
  c("ProductLaunch-DarkCountdown",   ProductLaunchDarkCountdown,   "productlaunch"),
  c("ProductLaunch-BoldCountdown",   ProductLaunchBoldCountdown,   "productlaunch"),

  // Tutorial
  c("Tutorial-DarkNumberedSteps", TutorialDarkNumberedSteps, "tutorial"),
  c("Tutorial-CleanNumberedSteps",TutorialCleanNumberedSteps,"tutorial"),
  c("Tutorial-DarkCardSequence",  TutorialDarkCardSequence,  "tutorial"),
  c("Tutorial-CleanCardSequence", TutorialCleanCardSequence, "tutorial"),
  c("Tutorial-DarkSplitDemo",     TutorialDarkSplitDemo,     "tutorial"),
  c("Tutorial-CleanSplitDemo",    TutorialCleanSplitDemo,    "tutorial"),

  // Before/After
  c("BeforeAfter-DarkSplitScreen",  BeforeAfterDarkSplitScreen,  "beforeafter"),
  c("BeforeAfter-WarmSplitScreen",  BeforeAfterWarmSplitScreen,  "beforeafter"),
  c("BeforeAfter-DarkRevealWipe",   BeforeAfterDarkRevealWipe,   "beforeafter"),
  c("BeforeAfter-WarmRevealWipe",   BeforeAfterWarmRevealWipe,   "beforeafter"),
  c("BeforeAfter-DarkMetricsCompare",BeforeAfterDarkMetricsCompare,"beforeafter"),
  c("BeforeAfter-WarmMetricsCompare",BeforeAfterWarmMetricsCompare,"beforeafter"),

  // Course Promo
  c("CoursePromo-DarkOverview",     CoursePromoDarkOverview,     "coursepromo"),
  c("CoursePromo-CleanOverview",    CoursePromoCleanOverview,    "coursepromo"),
  c("CoursePromo-DarkCurriculum",   CoursePromoDarkCurriculum,   "coursepromo"),
  c("CoursePromo-CleanCurriculum",  CoursePromoCleanCurriculum,  "coursepromo"),
  c("CoursePromo-DarkInstructor",   CoursePromoDarkInstructor,   "coursepromo"),
  c("CoursePromo-CleanInstructor",  CoursePromoCleanInstructor,  "coursepromo"),

  // Countdown Hype
  c("CountdownHype-DarkTimer",   CountdownHypeDarkTimer,   "countdownhype"),
  c("CountdownHype-NeonTimer",   CountdownHypeNeonTimer,   "countdownhype"),
  c("CountdownHype-DarkTeaser",  CountdownHypeDarkTeaser,  "countdownhype"),
  c("CountdownHype-NeonTeaser",  CountdownHypeNeonTeaser,  "countdownhype"),
  c("CountdownHype-DarkUrgency", CountdownHypeDarkUrgency, "countdownhype"),
  c("CountdownHype-NeonUrgency", CountdownHypeNeonUrgency, "countdownhype"),

  // Affiliate Review
  c("AffiliateReview-DarkScorecard",  AffiliateReviewDarkScorecard,  "affiliatereview"),
  c("AffiliateReview-BoldScorecard",  AffiliateReviewBoldScorecard,  "affiliatereview"),
  c("AffiliateReview-DarkComparison", AffiliateReviewDarkComparison, "affiliatereview"),
  c("AffiliateReview-BoldComparison", AffiliateReviewBoldComparison, "affiliatereview"),
  c("AffiliateReview-DarkVerdict",    AffiliateReviewDarkVerdict,    "affiliatereview"),
  c("AffiliateReview-BoldVerdict",    AffiliateReviewBoldVerdict,    "affiliatereview"),

  // Poll Quiz
  c("PollQuiz-DarkQuestionCard", PollQuizDarkQuestionCard, "pollquiz"),
  c("PollQuiz-NeonQuestionCard", PollQuizNeonQuestionCard, "pollquiz"),
  c("PollQuiz-DarkResultsBar",   PollQuizDarkResultsBar,   "pollquiz"),
  c("PollQuiz-NeonResultsBar",   PollQuizNeonResultsBar,   "pollquiz"),
  c("PollQuiz-DarkReveal",       PollQuizDarkReveal,       "pollquiz"),
  c("PollQuiz-NeonReveal",       PollQuizNeonReveal,       "pollquiz"),

  // Newsletter Promo
  c("NewsletterPromo-DarkSubscribeCta",     NewsletterPromoDarkSubscribeCta,     "newsletterpromo"),
  c("NewsletterPromo-CleanSubscribeCta",    NewsletterPromoCleanSubscribeCta,    "newsletterpromo"),
  c("NewsletterPromo-DarkIssuePreview",     NewsletterPromoDarkIssuePreview,     "newsletterpromo"),
  c("NewsletterPromo-CleanIssuePreview",    NewsletterPromoCleanIssuePreview,    "newsletterpromo"),
  c("NewsletterPromo-DarkTestimonialBlend", NewsletterPromoDarkTestimonialBlend, "newsletterpromo"),
  c("NewsletterPromo-CleanTestimonialBlend",NewsletterPromoCleanTestimonialBlend,"newsletterpromo"),

  // Podcast Audiogram
  c("PodcastAudiogram-DarkWaveform",    PodcastAudiogramDarkWaveform,    "podcastaudiogram"),
  c("PodcastAudiogram-WarmWaveform",    PodcastAudiogramWarmWaveform,    "podcastaudiogram"),
  c("PodcastAudiogram-DarkQuoteCard",   PodcastAudiogramDarkQuoteCard,   "podcastaudiogram"),
  c("PodcastAudiogram-WarmQuoteCard",   PodcastAudiogramWarmQuoteCard,   "podcastaudiogram"),
  c("PodcastAudiogram-DarkEpisodePromo",PodcastAudiogramDarkEpisodePromo,"podcastaudiogram"),
  c("PodcastAudiogram-WarmEpisodePromo",PodcastAudiogramWarmEpisodePromo,"podcastaudiogram"),

  // Behind the Scenes
  c("BehindTheScenes-DarkSceneCards",  BehindTheScenesDarkSceneCards,  "behindthescenes"),
  c("BehindTheScenes-WarmSceneCards",  BehindTheScenesWarmSceneCards,  "behindthescenes"),
  c("BehindTheScenes-DarkTimeline",    BehindTheScenesDarkTimeline,    "behindthescenes"),
  c("BehindTheScenes-WarmTimeline",    BehindTheScenesWarmTimeline,    "behindthescenes"),
  c("BehindTheScenes-DarkProcessFlow", BehindTheScenesDarkProcessFlow, "behindthescenes"),
  c("BehindTheScenes-WarmProcessFlow", BehindTheScenesWarmProcessFlow, "behindthescenes"),

  // Recipe Step
  c("RecipeStep-WarmIngredientList", RecipeStepWarmIngredientList, "recipestep"),
  c("RecipeStep-CleanIngredientList",RecipeStepCleanIngredientList,"recipestep"),
  c("RecipeStep-WarmStepSequence",   RecipeStepWarmStepSequence,   "recipestep"),
  c("RecipeStep-CleanStepSequence",  RecipeStepCleanStepSequence,  "recipestep"),
  c("RecipeStep-WarmSummaryCard",    RecipeStepWarmSummaryCard,    "recipestep"),
  c("RecipeStep-CleanSummaryCard",   RecipeStepCleanSummaryCard,   "recipestep"),

  // Listing
  c("Listing-CleanShowcase",   ListingCleanShowcase,   "listing"),
  c("Listing-MinimalShowcase", ListingMinimalShowcase, "listing"),
  c("Listing-CleanFeatureGrid",ListingCleanFeatureGrid,"listing"),
  c("Listing-MinimalFeatureGrid",ListingMinimalFeatureGrid,"listing"),
  c("Listing-CleanComparison", ListingCleanComparison, "listing"),
  c("Listing-MinimalComparison",ListingMinimalComparison,"listing"),

  // Fitness Routine
  c("FitnessRoutine-BoldExerciseList", FitnessRoutineBoldExerciseList, "fitnessroutine"),
  c("FitnessRoutine-NeonExerciseList", FitnessRoutineNeonExerciseList, "fitnessroutine"),
  c("FitnessRoutine-BoldTimerFocus",   FitnessRoutineBoldTimerFocus,   "fitnessroutine"),
  c("FitnessRoutine-NeonTimerFocus",   FitnessRoutineNeonTimerFocus,   "fitnessroutine"),
  c("FitnessRoutine-BoldCircuit",      FitnessRoutineBoldCircuit,      "fitnessroutine"),
  c("FitnessRoutine-NeonCircuit",      FitnessRoutineNeonCircuit,      "fitnessroutine"),

  // Music Visualizer
  c("MusicVisualizer-DarkBars",   MusicVisualizerDarkBars,   "musicvisualizer"),
  c("MusicVisualizer-NeonBars",   MusicVisualizerNeonBars,   "musicvisualizer"),
  c("MusicVisualizer-DarkRadial", MusicVisualizerDarkRadial, "musicvisualizer"),
  c("MusicVisualizer-NeonRadial", MusicVisualizerNeonRadial, "musicvisualizer"),
  c("MusicVisualizer-DarkLyrics", MusicVisualizerDarkLyrics, "musicvisualizer"),
  c("MusicVisualizer-NeonLyrics", MusicVisualizerNeonLyrics, "musicvisualizer"),

  // Collaboration
  c("Collaboration-DarkSplitScreen",  CollaborationDarkSplitScreen,  "collaboration"),
  c("Collaboration-BoldSplitScreen",  CollaborationBoldSplitScreen,  "collaboration"),
  c("Collaboration-DarkAnnouncement", CollaborationDarkAnnouncement, "collaboration"),
  c("Collaboration-BoldAnnouncement", CollaborationBoldAnnouncement, "collaboration"),
  c("Collaboration-DarkStatsMerge",   CollaborationDarkStatsMerge,   "collaboration"),
  c("Collaboration-BoldStatsMerge",   CollaborationBoldStatsMerge,   "collaboration"),

  // Sprint Dashboard
  c("SprintDashboard-KanbanDark",    SprintDashboardKanbanDark,    "sprintdashboard"),
  c("SprintDashboard-KanbanBold",    SprintDashboardKanbanBold,    "sprintdashboard"),
  c("SprintDashboard-VelocityDark",  SprintDashboardVelocityDark,  "sprintdashboard"),
  c("SprintDashboard-VelocityBold",  SprintDashboardVelocityBold,  "sprintdashboard"),
  c("SprintDashboard-BurndownDark",  SprintDashboardBurndownDark,  "sprintdashboard"),
  c("SprintDashboard-BurndownBold",  SprintDashboardBurndownBold,  "sprintdashboard"),

  // Feature Roadmap
  c("FeatureRoadmap-TimelineDark",  FeatureRoadmapTimelineDark,  "featureroadmap"),
  c("FeatureRoadmap-TimelineClean", FeatureRoadmapTimelineClean, "featureroadmap"),
  c("FeatureRoadmap-SwimlaneDark",  FeatureRoadmapSwimlaneDark,  "featureroadmap"),
  c("FeatureRoadmap-SwimlaneClean", FeatureRoadmapSwimlaneClean, "featureroadmap"),
  c("FeatureRoadmap-GridDark",      FeatureRoadmapGridDark,      "featureroadmap"),
  c("FeatureRoadmap-GridClean",     FeatureRoadmapGridClean,     "featureroadmap"),

  // Platform Overview
  c("PlatformOverview-CommandCenterDark", PlatformOverviewCommandCenterDark, "platformoverview"),
  c("PlatformOverview-CommandCenterNeon", PlatformOverviewCommandCenterNeon, "platformoverview"),
  c("PlatformOverview-ModuleGridDark",    PlatformOverviewModuleGridDark,    "platformoverview"),
  c("PlatformOverview-ModuleGridNeon",    PlatformOverviewModuleGridNeon,    "platformoverview"),
  c("PlatformOverview-StackDark",         PlatformOverviewStackDark,         "platformoverview"),
  c("PlatformOverview-StackNeon",         PlatformOverviewStackNeon,         "platformoverview"),

  // Agent Dashboard
  c("AgentDashboard-ControlPanelDark", AgentDashboardControlPanelDark, "agentdashboard"),
  c("AgentDashboard-ControlPanelNeon", AgentDashboardControlPanelNeon, "agentdashboard"),
  c("AgentDashboard-FlowDark",         AgentDashboardFlowDark,         "agentdashboard"),
  c("AgentDashboard-FlowNeon",         AgentDashboardFlowNeon,         "agentdashboard"),
  c("AgentDashboard-MatrixDark",       AgentDashboardMatrixDark,       "agentdashboard"),
  c("AgentDashboard-MatrixNeon",       AgentDashboardMatrixNeon,       "agentdashboard"),

  // Client Pipeline
  c("ClientPipeline-FunnelDark",         ClientPipelineFunnelDark,         "clientpipeline"),
  c("ClientPipeline-FunnelWarm",         ClientPipelineFunnelWarm,         "clientpipeline"),
  c("ClientPipeline-PipelineBoardDark",  ClientPipelinePipelineBoardDark,  "clientpipeline"),
  c("ClientPipeline-PipelineBoardWarm",  ClientPipelinePipelineBoardWarm,  "clientpipeline"),
  c("ClientPipeline-MetricsDark",        ClientPipelineMetricsDark,        "clientpipeline"),
  c("ClientPipeline-MetricsWarm",        ClientPipelineMetricsWarm,        "clientpipeline"),

  // Integration Status
  c("IntegrationStatus-StatusWallDark",       IntegrationStatusStatusWallDark,       "integrationstatus"),
  c("IntegrationStatus-StatusWallClean",      IntegrationStatusStatusWallClean,      "integrationstatus"),
  c("IntegrationStatus-CategoryGroupsDark",   IntegrationStatusCategoryGroupsDark,   "integrationstatus"),
  c("IntegrationStatus-CategoryGroupsClean",  IntegrationStatusCategoryGroupsClean,  "integrationstatus"),
  c("IntegrationStatus-HealthMonitorDark",    IntegrationStatusHealthMonitorDark,    "integrationstatus"),
  c("IntegrationStatus-HealthMonitorClean",   IntegrationStatusHealthMonitorClean,   "integrationstatus"),

  // Bug Tracker
  c("BugTracker-SeverityMatrixDark", BugTrackerSeverityMatrixDark, "bugtracker"),
  c("BugTracker-SeverityMatrixBold", BugTrackerSeverityMatrixBold, "bugtracker"),
  c("BugTracker-TriageBoardDark",    BugTrackerTriageBoardDark,    "bugtracker"),
  c("BugTracker-TriageBoardBold",    BugTrackerTriageBoardBold,    "bugtracker"),
  c("BugTracker-OverviewDark",       BugTrackerOverviewDark,       "bugtracker"),
  c("BugTracker-OverviewBold",       BugTrackerOverviewBold,       "bugtracker"),

  // Release Notes
  c("ReleaseNotes-ChangelogDark",      ReleaseNotesChangelogDark,      "releasenotes"),
  c("ReleaseNotes-ChangelogClean",     ReleaseNotesChangelogClean,     "releasenotes"),
  c("ReleaseNotes-HighlightsDark",     ReleaseNotesHighlightsDark,     "releasenotes"),
  c("ReleaseNotes-HighlightsClean",    ReleaseNotesHighlightsClean,    "releasenotes"),
  c("ReleaseNotes-VersionCompareDark", ReleaseNotesVersionCompareDark, "releasenotes"),
  c("ReleaseNotes-VersionCompareClean",ReleaseNotesVersionCompareClean,"releasenotes"),

  // Effort Tracking
  c("EffortTracking-TeamAllocationDark", EffortTrackingTeamAllocationDark, "efforttracking"),
  c("EffortTracking-TeamAllocationWarm", EffortTrackingTeamAllocationWarm, "efforttracking"),
  c("EffortTracking-CapacityDark",       EffortTrackingCapacityDark,       "efforttracking"),
  c("EffortTracking-CapacityWarm",       EffortTrackingCapacityWarm,       "efforttracking"),
  c("EffortTracking-BreakdownDark",      EffortTrackingBreakdownDark,      "efforttracking"),
  c("EffortTracking-BreakdownWarm",      EffortTrackingBreakdownWarm,      "efforttracking"),

  // Pin Collection
  c("PinCollection-CardGalleryWarm",  PinCollectionCardGalleryWarm,  "pincollection"),
  c("PinCollection-CardGalleryClean", PinCollectionCardGalleryClean, "pincollection"),
  c("PinCollection-MapListWarm",      PinCollectionMapListWarm,      "pincollection"),
  c("PinCollection-MapListClean",     PinCollectionMapListClean,     "pincollection"),
  c("PinCollection-CategoryGridWarm", PinCollectionCategoryGridWarm, "pincollection"),
  c("PinCollection-CategoryGridClean",PinCollectionCategoryGridClean,"pincollection"),

  // Office Directory
  c("OfficeDirectory-WorldViewDark",   OfficeDirectoryWorldViewDark,   "officedirectory"),
  c("OfficeDirectory-WorldViewClean",  OfficeDirectoryWorldViewClean,  "officedirectory"),
  c("OfficeDirectory-CardListDark",    OfficeDirectoryCardListDark,    "officedirectory"),
  c("OfficeDirectory-CardListClean",   OfficeDirectoryCardListClean,   "officedirectory"),
  c("OfficeDirectory-RegionGroupsDark",OfficeDirectoryRegionGroupsDark,"officedirectory"),
  c("OfficeDirectory-RegionGroupsClean",OfficeDirectoryRegionGroupsClean,"officedirectory"),

  // Travel Itinerary
  c("TravelItinerary-DayByDayWarm",      TravelItineraryDayByDayWarm,      "travelitinerary"),
  c("TravelItinerary-DayByDayBold",      TravelItineraryDayByDayBold,      "travelitinerary"),
  c("TravelItinerary-RouteOverviewWarm", TravelItineraryRouteOverviewWarm, "travelitinerary"),
  c("TravelItinerary-RouteOverviewBold", TravelItineraryRouteOverviewBold, "travelitinerary"),
  c("TravelItinerary-HighlightsWarm",    TravelItineraryHighlightsWarm,    "travelitinerary"),
  c("TravelItinerary-HighlightsBold",    TravelItineraryHighlightsBold,    "travelitinerary"),

  // Store Locator
  c("StoreLocator-FinderClean",    StoreLocatorFinderClean,    "storelocator"),
  c("StoreLocator-FinderMinimal",  StoreLocatorFinderMinimal,  "storelocator"),
  c("StoreLocator-MapPinsClean",   StoreLocatorMapPinsClean,   "storelocator"),
  c("StoreLocator-MapPinsMinimal", StoreLocatorMapPinsMinimal, "storelocator"),
  c("StoreLocator-DirectoryClean", StoreLocatorDirectoryClean, "storelocator"),
  c("StoreLocator-DirectoryMinimal",StoreLocatorDirectoryMinimal,"storelocator"),

  // Neighborhood Guide
  c("NeighborhoodGuide-ExplorerWarm",      NeighborhoodGuideExplorerWarm,      "neighborhoodguide"),
  c("NeighborhoodGuide-ExplorerNeon",      NeighborhoodGuideExplorerNeon,      "neighborhoodguide"),
  c("NeighborhoodGuide-HighlightsReelWarm",NeighborhoodGuideHighlightsReelWarm,"neighborhoodguide"),
  c("NeighborhoodGuide-HighlightsReelNeon",NeighborhoodGuideHighlightsReelNeon,"neighborhoodguide"),
  c("NeighborhoodGuide-OverviewWarm",      NeighborhoodGuideOverviewWarm,      "neighborhoodguide"),
  c("NeighborhoodGuide-OverviewNeon",      NeighborhoodGuideOverviewNeon,      "neighborhoodguide"),

  // Event Venue
  c("EventVenue-ScheduleMapDark",   EventVenueScheduleMapDark,   "eventvenue"),
  c("EventVenue-ScheduleMapBold",   EventVenueScheduleMapBold,   "eventvenue"),
  c("EventVenue-VenueCardsDark",    EventVenueVenueCardsDark,    "eventvenue"),
  c("EventVenue-VenueCardsBold",    EventVenueVenueCardsBold,    "eventvenue"),
  c("EventVenue-EventOverviewDark", EventVenueEventOverviewDark, "eventvenue"),
  c("EventVenue-EventOverviewBold", EventVenueEventOverviewBold, "eventvenue"),

  // Sprint Recap
  c("SprintRecap-ShippedListDark",       SprintRecapShippedListDark,       "sprintrecap"),
  c("SprintRecap-ShippedListBold",       SprintRecapShippedListBold,       "sprintrecap"),
  c("SprintRecap-HighlightCardsDark",    SprintRecapHighlightCardsDark,    "sprintrecap"),
  c("SprintRecap-HighlightCardsBold",    SprintRecapHighlightCardsBold,    "sprintrecap"),
  c("SprintRecap-TeamContributionsDark", SprintRecapTeamContributionsDark, "sprintrecap"),
  c("SprintRecap-TeamContributionsBold", SprintRecapTeamContributionsBold, "sprintrecap"),

  // Deployment Status
  c("DeploymentStatus-EnvironmentCardsDark", DeploymentStatusEnvironmentCardsDark, "deploymentstatus"),
  c("DeploymentStatus-EnvironmentCardsNeon", DeploymentStatusEnvironmentCardsNeon, "deploymentstatus"),
  c("DeploymentStatus-PipelineViewDark",     DeploymentStatusPipelineViewDark,     "deploymentstatus"),
  c("DeploymentStatus-PipelineViewNeon",     DeploymentStatusPipelineViewNeon,     "deploymentstatus"),
  c("DeploymentStatus-HealthDashboardDark",  DeploymentStatusHealthDashboardDark,  "deploymentstatus"),
  c("DeploymentStatus-HealthDashboardNeon",  DeploymentStatusHealthDashboardNeon,  "deploymentstatus"),

  // Velocity Chart
  c("VelocityChart-BarChartDark",  VelocityChartBarChartDark,  "velocitychart"),
  c("VelocityChart-BarChartClean", VelocityChartBarChartClean, "velocitychart"),
  c("VelocityChart-TrendLineDark", VelocityChartTrendLineDark, "velocitychart"),
  c("VelocityChart-TrendLineClean",VelocityChartTrendLineClean,"velocitychart"),
  c("VelocityChart-SummaryDark",   VelocityChartSummaryDark,   "velocitychart"),
  c("VelocityChart-SummaryClean",  VelocityChartSummaryClean,  "velocitychart"),

  // QBR Dashboard
  c("QBRDashboard-ExecutiveDark",   QBRDashboardExecutiveDark,   "qbrdashboard"),
  c("QBRDashboard-ExecutiveClean",  QBRDashboardExecutiveClean,  "qbrdashboard"),
  c("QBRDashboard-DetailedDark",    QBRDashboardDetailedDark,    "qbrdashboard"),
  c("QBRDashboard-DetailedClean",   QBRDashboardDetailedClean,   "qbrdashboard"),
  c("QBRDashboard-ComparisonDark",  QBRDashboardComparisonDark,  "qbrdashboard"),
  c("QBRDashboard-ComparisonClean", QBRDashboardComparisonClean, "qbrdashboard"),

  // Project Health
  c("ProjectHealth-HealthScorecardDark", ProjectHealthHealthScorecardDark, "projecthealth"),
  c("ProjectHealth-HealthScorecardWarm", ProjectHealthHealthScorecardWarm, "projecthealth"),
  c("ProjectHealth-WorkstreamViewDark",  ProjectHealthWorkstreamViewDark,  "projecthealth"),
  c("ProjectHealth-WorkstreamViewWarm",  ProjectHealthWorkstreamViewWarm,  "projecthealth"),
  c("ProjectHealth-ExecutiveSummaryDark",ProjectHealthExecutiveSummaryDark,"projecthealth"),
  c("ProjectHealth-ExecutiveSummaryWarm",ProjectHealthExecutiveSummaryWarm,"projecthealth"),

  // Feature Flags
  c("FeatureFlags-ExperimentBoardDark",  FeatureFlagsExperimentBoardDark,  "featureflags"),
  c("FeatureFlags-ExperimentBoardNeon",  FeatureFlagsExperimentBoardNeon,  "featureflags"),
  c("FeatureFlags-ResultsViewDark",      FeatureFlagsResultsViewDark,      "featureflags"),
  c("FeatureFlags-ResultsViewNeon",      FeatureFlagsResultsViewNeon,      "featureflags"),
  c("FeatureFlags-RolloutTrackerDark",   FeatureFlagsRolloutTrackerDark,   "featureflags"),
  c("FeatureFlags-RolloutTrackerNeon",   FeatureFlagsRolloutTrackerNeon,   "featureflags"),

  // Bug Triage
  c("BugTriage-PriorityColumnsDark",    BugTriagePriorityColumnsDark,    "bugtriage"),
  c("BugTriage-PriorityColumnsBold",    BugTriagePriorityColumnsBold,    "bugtriage"),
  c("BugTriage-TriageListDark",         BugTriageTriageListDark,         "bugtriage"),
  c("BugTriage-TriageListBold",         BugTriageTriageListBold,         "bugtriage"),
  c("BugTriage-SummaryDashboardDark",   BugTriageSummaryDashboardDark,   "bugtriage"),
  c("BugTriage-SummaryDashboardBold",   BugTriageSummaryDashboardBold,   "bugtriage"),

  // Component Inventory
  c("ComponentInventory-ArchitectureGridDark",  ComponentInventoryArchitectureGridDark,  "componentinventory"),
  c("ComponentInventory-ArchitectureGridClean", ComponentInventoryArchitectureGridClean, "componentinventory"),
  c("ComponentInventory-DependencyMapDark",     ComponentInventoryDependencyMapDark,     "componentinventory"),
  c("ComponentInventory-DependencyMapClean",    ComponentInventoryDependencyMapClean,    "componentinventory"),
  c("ComponentInventory-InventoryListDark",     ComponentInventoryInventoryListDark,     "componentinventory"),
  c("ComponentInventory-InventoryListClean",    ComponentInventoryInventoryListClean,    "componentinventory"),

  // Concept Pitch
  c("ConceptPitch-ArcDark",   ConceptPitchArcDark,   "conceptpitch"),
  c("ConceptPitch-ArcBold",   ConceptPitchArcBold,   "conceptpitch"),
  c("ConceptPitch-BoardDark", ConceptPitchBoardDark, "conceptpitch"),
  c("ConceptPitch-BoardBold", ConceptPitchBoardBold, "conceptpitch"),
  c("ConceptPitch-BriefDark", ConceptPitchBriefDark, "conceptpitch"),
  c("ConceptPitch-BriefBold", ConceptPitchBriefBold, "conceptpitch"),

  // Thought Leadership
  c("ThoughtLeadership-EditorialDark",  ThoughtLeadershipEditorialDark,  "thoughtleadership"),
  c("ThoughtLeadership-EditorialClean", ThoughtLeadershipEditorialClean, "thoughtleadership"),
  c("ThoughtLeadership-NarrativeDark",  ThoughtLeadershipNarrativeDark,  "thoughtleadership"),
  c("ThoughtLeadership-NarrativeClean", ThoughtLeadershipNarrativeClean, "thoughtleadership"),
  c("ThoughtLeadership-KeynoteDark",    ThoughtLeadershipKeynoteDark,    "thoughtleadership"),
  c("ThoughtLeadership-KeynoteClean",   ThoughtLeadershipKeynoteClean,   "thoughtleadership"),

  // YouTube Tutorial
  c("YouTubeTutorial-VideoFlowPipeline", VideoFlowPipelineTutorial, "youtubetuorial"),
];

// ── Derived counts (auto-computed from registry) ─────────────────

export const TOTAL_COMPOSITIONS = COMPOSITIONS.length;
export const TOTAL_TEMPLATE_TYPES = new Set(COMPOSITIONS.map((c) => c.category)).size;

// Lookup by ID
export const COMP_BY_ID = Object.fromEntries(COMPOSITIONS.map((c) => [c.id, c]));

// Get unique categories in order
export const CATEGORIES = [...new Set(COMPOSITIONS.map((c) => c.category))];
