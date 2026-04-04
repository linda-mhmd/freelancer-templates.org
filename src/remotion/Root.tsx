/**
 * Root.tsx - All freelancer template compositions
 *
 * Run locally:
 *   npx remotion studio src/remotion/index.ts
 *
 * Render a single composition:
 *   npx remotion render src/remotion/index.ts Testimonial-NeonSplit out/video.mp4
 *
 * Render all variants of a template type:
 *   npx remotion render src/remotion/index.ts Testimonial-* out/
 */

import React from "react";
import { Composition } from "remotion";
// ── Concept Pitch ─────────────────────────────────────────────────
import { ConceptPitchArcDark, ConceptPitchArcBold, ConceptPitchBoardDark, ConceptPitchBoardBold, ConceptPitchBriefDark, ConceptPitchBriefBold } from "./templates/conceptpitch/ConceptPitchShowcase";
// ── Thought Leadership ────────────────────────────────────────────
import { ThoughtLeadershipEditorialDark, ThoughtLeadershipEditorialClean, ThoughtLeadershipNarrativeDark, ThoughtLeadershipNarrativeClean, ThoughtLeadershipKeynoteDark, ThoughtLeadershipKeynoteClean } from "./templates/thoughtleadership/ThoughtLeadershipShowcase";
// ── Linda Mohamed (personal deck) ────────────────────────────────
import { Folie1Cover, Folie2AboutMe, Folie3WhatIOffer, Folie4CostsPackages } from "./templates/lindamohamed/LindaMohamed";
import { Folie1CoverV2, Folie2AboutMeV2, Folie3WhatIOfferV2, Folie4CostsPackagesV2, Folie5WorkshopsV2 } from "./templates/lindamohamed/LindaMohamedV2";
// ── YouTube Tutorial ─────────────────────────────────────────────
import { VideoFlowPipelineTutorial } from "./templates/youtubetuorial/tutorials/VideoFlowPipeline";

// ── Testimonial ───────────────────────────────────────────────────
import { TestimonialDarkCentered, TestimonialCleanSplit, TestimonialBoldEditorial, TestimonialWarmCentered, TestimonialMinimalEditorial, TestimonialNeonSplit } from "./templates/testimonial/TestimonialShowcase";
// ── Recap ─────────────────────────────────────────────────────────
import { RecapDarkDashboard, RecapCleanTimeline, RecapBoldCards, RecapWarmDashboard, RecapMinimalCards, RecapNeonTimeline } from "./templates/recap/RecapShowcase";
// ── Event ─────────────────────────────────────────────────────────
import { EventDarkHero, EventCleanSpeakers, EventBoldCountdown, EventWarmHero, EventMinimalSpeakers, EventNeonCountdown } from "./templates/event/EventShowcase";
// ── Proposal ─────────────────────────────────────────────────────
import { ProposalDarkExecutive, ProposalCleanCreative, ProposalBoldPitch, ProposalWarmExecutive, ProposalMinimalCreative, ProposalNeonPitch } from "./templates/proposal/ProposalShowcase";
// ── Explainer ────────────────────────────────────────────────────
import { ExplainerDarkCinematic, ExplainerCleanWhiteboard, ExplainerBoldProcess, ExplainerWarmWhiteboard, ExplainerMinimalProcess, ExplainerNeonCinematic } from "./templates/explainer/ExplainerShowcase";
// ── Portfolio ────────────────────────────────────────────────────
import { PortfolioDarkGallery, PortfolioCleanCaseStudy, PortfolioBoldReel, PortfolioWarmGallery, PortfolioMinimalCaseStudy, PortfolioNeonReel } from "./templates/portfolio/PortfolioShowcase";
// ── Onboarding ───────────────────────────────────────────────────
import { OnboardingDarkProfessional, OnboardingCleanProfessional, OnboardingBoldCreative, OnboardingWarmFriendly, OnboardingMinimalProfessional, OnboardingNeonCreative } from "./templates/onboarding/OnboardingShowcase";
// ── Invoice ──────────────────────────────────────────────────────
import { InvoiceDarkProfessional, InvoiceCleanProfessional, InvoiceBoldUrgent, InvoiceWarmFriendly, InvoiceMinimalProfessional, InvoiceNeonUrgent } from "./templates/invoice/InvoiceShowcase";
// ── Social Proof ─────────────────────────────────────────────────
import { SocialProofDarkMilestone, SocialProofCleanAchievement, SocialProofBoldAnnouncement, SocialProofWarmMilestone, SocialProofMinimalAchievement, SocialProofNeonAnnouncement } from "./templates/socialproof/SocialProofShowcase";
// ── Case Study ───────────────────────────────────────────────────
import { CaseStudyDarkNarrative, CaseStudyCleanComparison, CaseStudyBoldSpotlight, CaseStudyWarmNarrative, CaseStudyMinimalComparison, CaseStudyNeonSpotlight } from "./templates/casestudy/CaseStudyShowcase";
// ── Pricing ──────────────────────────────────────────────────────
import { PricingDarkTiers, PricingCleanComparison, PricingBoldSpotlight, PricingWarmTiers, PricingMinimalComparison, PricingNeonSpotlight } from "./templates/pricing/PricingShowcase";
// ── FAQ ──────────────────────────────────────────────────────────
import { FAQDarkAccordion, FAQCleanCards, FAQBoldInterview, FAQWarmAccordion, FAQMinimalCards, FAQNeonInterview } from "./templates/faq/FAQShowcase";
// ── Milestone ────────────────────────────────────────────────────
import { MilestoneDarkCelebration, MilestoneCleanJourney, MilestoneBoldCelebration, MilestoneWarmGratitude, MilestoneMinimalJourney, MilestoneNeonCelebration } from "./templates/milestone/MilestoneShowcase";
// ── Product Launch ───────────────────────────────────────────────
import { ProductLaunchDarkHeroReveal, ProductLaunchBoldHeroReveal, ProductLaunchDarkFeatureGrid, ProductLaunchBoldFeatureGrid, ProductLaunchDarkCountdown, ProductLaunchBoldCountdown } from "./templates/productlaunch/ProductLaunchShowcase";
// ── Tutorial ─────────────────────────────────────────────────────
import { TutorialDarkNumberedSteps, TutorialCleanNumberedSteps, TutorialDarkCardSequence, TutorialCleanCardSequence, TutorialDarkSplitDemo, TutorialCleanSplitDemo } from "./templates/tutorial/TutorialShowcase";
// ── Before/After ─────────────────────────────────────────────────
import { BeforeAfterDarkSplitScreen, BeforeAfterWarmSplitScreen, BeforeAfterDarkRevealWipe, BeforeAfterWarmRevealWipe, BeforeAfterDarkMetricsCompare, BeforeAfterWarmMetricsCompare } from "./templates/beforeafter/BeforeAfterShowcase";
// ── Course Promo ─────────────────────────────────────────────────
import { CoursePromoDarkOverview, CoursePromoCleanOverview, CoursePromoDarkCurriculum, CoursePromoCleanCurriculum, CoursePromoDarkInstructor, CoursePromoCleanInstructor } from "./templates/coursepromo/CoursePromoShowcase";
// ── Countdown Hype ───────────────────────────────────────────────
import { CountdownHypeDarkTimer, CountdownHypeNeonTimer, CountdownHypeDarkTeaser, CountdownHypeNeonTeaser, CountdownHypeDarkUrgency, CountdownHypeNeonUrgency } from "./templates/countdownhype/CountdownHypeShowcase";
// ── Affiliate Review ─────────────────────────────────────────────
import { AffiliateReviewDarkScorecard, AffiliateReviewBoldScorecard, AffiliateReviewDarkComparison, AffiliateReviewBoldComparison, AffiliateReviewDarkVerdict, AffiliateReviewBoldVerdict } from "./templates/affiliatereview/AffiliateReviewShowcase";
// ── Poll Quiz ────────────────────────────────────────────────────
import { PollQuizDarkQuestionCard, PollQuizNeonQuestionCard, PollQuizDarkResultsBar, PollQuizNeonResultsBar, PollQuizDarkReveal, PollQuizNeonReveal } from "./templates/pollquiz/PollQuizShowcase";
// ── Newsletter Promo ─────────────────────────────────────────────
import { NewsletterPromoDarkSubscribeCta, NewsletterPromoCleanSubscribeCta, NewsletterPromoDarkIssuePreview, NewsletterPromoCleanIssuePreview, NewsletterPromoDarkTestimonialBlend, NewsletterPromoCleanTestimonialBlend } from "./templates/newsletterpromo/NewsletterPromoShowcase";
// ── Podcast Audiogram ────────────────────────────────────────────
import { PodcastAudiogramDarkWaveform, PodcastAudiogramWarmWaveform, PodcastAudiogramDarkQuoteCard, PodcastAudiogramWarmQuoteCard, PodcastAudiogramDarkEpisodePromo, PodcastAudiogramWarmEpisodePromo } from "./templates/podcastaudiogram/PodcastAudiogramShowcase";
// ── Behind the Scenes ────────────────────────────────────────────
import { BehindTheScenesDarkSceneCards, BehindTheScenesWarmSceneCards, BehindTheScenesDarkTimeline, BehindTheScenesWarmTimeline, BehindTheScenesDarkProcessFlow, BehindTheScenesWarmProcessFlow } from "./templates/behindthescenes/BehindTheScenesShowcase";
// ── Recipe Step ──────────────────────────────────────────────────
import { RecipeStepWarmIngredientList, RecipeStepCleanIngredientList, RecipeStepWarmStepSequence, RecipeStepCleanStepSequence, RecipeStepWarmSummaryCard, RecipeStepCleanSummaryCard } from "./templates/recipestep/RecipeStepShowcase";
// ── Listing ──────────────────────────────────────────────────────
import { ListingCleanShowcase, ListingMinimalShowcase, ListingCleanFeatureGrid, ListingMinimalFeatureGrid, ListingCleanComparison, ListingMinimalComparison } from "./templates/listing/ListingShowcase";
// ── Fitness Routine ──────────────────────────────────────────────
import { FitnessRoutineBoldExerciseList, FitnessRoutineNeonExerciseList, FitnessRoutineBoldTimerFocus, FitnessRoutineNeonTimerFocus, FitnessRoutineBoldCircuit, FitnessRoutineNeonCircuit } from "./templates/fitnessroutine/FitnessRoutineShowcase";
// ── Music Visualizer ─────────────────────────────────────────────
import { MusicVisualizerDarkBars, MusicVisualizerNeonBars, MusicVisualizerDarkRadial, MusicVisualizerNeonRadial, MusicVisualizerDarkLyrics, MusicVisualizerNeonLyrics } from "./templates/musicvisualizer/MusicVisualizerShowcase";
// ── Collaboration ────────────────────────────────────────────────
import { CollaborationDarkSplitScreen, CollaborationBoldSplitScreen, CollaborationDarkAnnouncement, CollaborationBoldAnnouncement, CollaborationDarkStatsMerge, CollaborationBoldStatsMerge } from "./templates/collaboration/CollaborationShowcase";
// ── Sprint Dashboard ─────────────────────────────────────────────
import { SprintDashboardKanbanDark, SprintDashboardKanbanBold, SprintDashboardVelocityDark, SprintDashboardVelocityBold, SprintDashboardBurndownDark, SprintDashboardBurndownBold } from "./templates/sprintdashboard/SprintDashboardShowcase";
// ── Feature Roadmap ──────────────────────────────────────────────
import { FeatureRoadmapTimelineDark, FeatureRoadmapTimelineClean, FeatureRoadmapSwimlaneDark, FeatureRoadmapSwimlaneClean, FeatureRoadmapGridDark, FeatureRoadmapGridClean } from "./templates/featureroadmap/FeatureRoadmapShowcase";
// ── Platform Overview ────────────────────────────────────────────
import { PlatformOverviewCommandCenterDark, PlatformOverviewCommandCenterNeon, PlatformOverviewModuleGridDark, PlatformOverviewModuleGridNeon, PlatformOverviewStackDark, PlatformOverviewStackNeon } from "./templates/platformoverview/PlatformOverviewShowcase";
// ── Agent Dashboard ──────────────────────────────────────────────
import { AgentDashboardControlPanelDark, AgentDashboardControlPanelNeon, AgentDashboardFlowDark, AgentDashboardFlowNeon, AgentDashboardMatrixDark, AgentDashboardMatrixNeon } from "./templates/agentdashboard/AgentDashboardShowcase";
// ── Client Pipeline ──────────────────────────────────────────────
import { ClientPipelineFunnelDark, ClientPipelineFunnelWarm, ClientPipelinePipelineBoardDark, ClientPipelinePipelineBoardWarm, ClientPipelineMetricsDark, ClientPipelineMetricsWarm } from "./templates/clientpipeline/ClientPipelineShowcase";
// ── Integration Status ───────────────────────────────────────────
import { IntegrationStatusStatusWallDark, IntegrationStatusStatusWallClean, IntegrationStatusCategoryGroupsDark, IntegrationStatusCategoryGroupsClean, IntegrationStatusHealthMonitorDark, IntegrationStatusHealthMonitorClean } from "./templates/integrationstatus/IntegrationStatusShowcase";
// ── Bug Tracker ──────────────────────────────────────────────────
import { BugTrackerSeverityMatrixDark, BugTrackerSeverityMatrixBold, BugTrackerTriageBoardDark, BugTrackerTriageBoardBold, BugTrackerOverviewDark, BugTrackerOverviewBold } from "./templates/bugtracker/BugTrackerShowcase";
// ── Release Notes ────────────────────────────────────────────────
import { ReleaseNotesChangelogDark, ReleaseNotesChangelogClean, ReleaseNotesHighlightsDark, ReleaseNotesHighlightsClean, ReleaseNotesVersionCompareDark, ReleaseNotesVersionCompareClean } from "./templates/releasenotes/ReleaseNotesShowcase";
// ── Effort Tracking ──────────────────────────────────────────────
import { EffortTrackingTeamAllocationDark, EffortTrackingTeamAllocationWarm, EffortTrackingCapacityDark, EffortTrackingCapacityWarm, EffortTrackingBreakdownDark, EffortTrackingBreakdownWarm } from "./templates/efforttracking/EffortTrackingShowcase";
// ── Pin Collection ───────────────────────────────────────────────
import { PinCollectionCardGalleryWarm, PinCollectionCardGalleryClean, PinCollectionMapListWarm, PinCollectionMapListClean, PinCollectionCategoryGridWarm, PinCollectionCategoryGridClean } from "./templates/pincollection/PinCollectionShowcase";
// ── Office Directory ─────────────────────────────────────────────
import { OfficeDirectoryWorldViewDark, OfficeDirectoryWorldViewClean, OfficeDirectoryCardListDark, OfficeDirectoryCardListClean, OfficeDirectoryRegionGroupsDark, OfficeDirectoryRegionGroupsClean } from "./templates/officedirectory/OfficeDirectoryShowcase";
// ── Travel Itinerary ─────────────────────────────────────────────
import { TravelItineraryDayByDayWarm, TravelItineraryDayByDayBold, TravelItineraryRouteOverviewWarm, TravelItineraryRouteOverviewBold, TravelItineraryHighlightsWarm, TravelItineraryHighlightsBold } from "./templates/travelitinerary/TravelItineraryShowcase";
// ── Store Locator ────────────────────────────────────────────────
import { StoreLocatorFinderClean, StoreLocatorFinderMinimal, StoreLocatorMapPinsClean, StoreLocatorMapPinsMinimal, StoreLocatorDirectoryClean, StoreLocatorDirectoryMinimal } from "./templates/storelocator/StoreLocatorShowcase";
// ── Neighborhood Guide ───────────────────────────────────────────
import { NeighborhoodGuideExplorerWarm, NeighborhoodGuideExplorerNeon, NeighborhoodGuideHighlightsReelWarm, NeighborhoodGuideHighlightsReelNeon, NeighborhoodGuideOverviewWarm, NeighborhoodGuideOverviewNeon } from "./templates/neighborhoodguide/NeighborhoodGuideShowcase";
// ── Event Venue ──────────────────────────────────────────────────
import { EventVenueScheduleMapDark, EventVenueScheduleMapBold, EventVenueVenueCardsDark, EventVenueVenueCardsBold, EventVenueEventOverviewDark, EventVenueEventOverviewBold } from "./templates/eventvenue/EventVenueShowcase";
// ── Sprint Recap ─────────────────────────────────────────────────
import { SprintRecapShippedListDark, SprintRecapShippedListBold, SprintRecapHighlightCardsDark, SprintRecapHighlightCardsBold, SprintRecapTeamContributionsDark, SprintRecapTeamContributionsBold } from "./templates/sprintrecap/SprintRecapShowcase";
// ── Deployment Status ────────────────────────────────────────────
import { DeploymentStatusEnvironmentCardsDark, DeploymentStatusEnvironmentCardsNeon, DeploymentStatusPipelineViewDark, DeploymentStatusPipelineViewNeon, DeploymentStatusHealthDashboardDark, DeploymentStatusHealthDashboardNeon } from "./templates/deploymentstatus/DeploymentStatusShowcase";
// ── Velocity Chart ───────────────────────────────────────────────
import { VelocityChartBarChartDark, VelocityChartBarChartClean, VelocityChartTrendLineDark, VelocityChartTrendLineClean, VelocityChartSummaryDark, VelocityChartSummaryClean } from "./templates/velocitychart/VelocityChartShowcase";
// ── QBR Dashboard ────────────────────────────────────────────────
import { QBRDashboardExecutiveDark, QBRDashboardExecutiveClean, QBRDashboardDetailedDark, QBRDashboardDetailedClean, QBRDashboardComparisonDark, QBRDashboardComparisonClean } from "./templates/qbrdashboard/QBRDashboardShowcase";
// ── Project Health ───────────────────────────────────────────────
import { ProjectHealthHealthScorecardDark, ProjectHealthHealthScorecardWarm, ProjectHealthWorkstreamViewDark, ProjectHealthWorkstreamViewWarm, ProjectHealthExecutiveSummaryDark, ProjectHealthExecutiveSummaryWarm } from "./templates/projecthealth/ProjectHealthShowcase";
// ── Feature Flags ────────────────────────────────────────────────
import { FeatureFlagsExperimentBoardDark, FeatureFlagsExperimentBoardNeon, FeatureFlagsResultsViewDark, FeatureFlagsResultsViewNeon, FeatureFlagsRolloutTrackerDark, FeatureFlagsRolloutTrackerNeon } from "./templates/featureflags/FeatureFlagsShowcase";
// ── Bug Triage ───────────────────────────────────────────────────
import { BugTriagePriorityColumnsDark, BugTriagePriorityColumnsBold, BugTriageTriageListDark, BugTriageTriageListBold, BugTriageSummaryDashboardDark, BugTriageSummaryDashboardBold } from "./templates/bugtriage/BugTriageShowcase";
// ── Component Inventory ──────────────────────────────────────────
import { ComponentInventoryArchitectureGridDark, ComponentInventoryArchitectureGridClean, ComponentInventoryDependencyMapDark, ComponentInventoryDependencyMapClean, ComponentInventoryInventoryListDark, ComponentInventoryInventoryListClean } from "./templates/componentinventory/ComponentInventoryShowcase";

// Standard composition defaults: 1280x720, 30fps, 10s
const W = 1280, H = 720, FPS = 30, DUR = 300;

export const RemotionRoot: React.FC = () => (
  <>
    {/* ── Testimonial ─────────────────────────────────────────────── */}
    <Composition id="Testimonial/DarkCentered"    component={TestimonialDarkCentered}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Testimonial/CleanSplit"      component={TestimonialCleanSplit}      durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Testimonial/BoldEditorial"   component={TestimonialBoldEditorial}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Testimonial/WarmCentered"    component={TestimonialWarmCentered}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Testimonial/MinimalEditorial"component={TestimonialMinimalEditorial}durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Testimonial/NeonSplit"       component={TestimonialNeonSplit}       durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Recap ───────────────────────────────────────────────────── */}
    <Composition id="Recap/DarkDashboard"  component={RecapDarkDashboard}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Recap/CleanTimeline"  component={RecapCleanTimeline}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Recap/BoldCards"      component={RecapBoldCards}      durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Recap/WarmDashboard"  component={RecapWarmDashboard}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Recap/MinimalCards"   component={RecapMinimalCards}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Recap/NeonTimeline"   component={RecapNeonTimeline}   durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Event ───────────────────────────────────────────────────── */}
    <Composition id="Event/DarkHero"       component={EventDarkHero}       durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Event/CleanSpeakers"  component={EventCleanSpeakers}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Event/BoldCountdown"  component={EventBoldCountdown}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Event/WarmHero"       component={EventWarmHero}       durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Event/MinimalSpeakers"component={EventMinimalSpeakers}durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Event/NeonCountdown"  component={EventNeonCountdown}  durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Proposal ────────────────────────────────────────────────── */}
    <Composition id="Proposal/DarkExecutive"   component={ProposalDarkExecutive}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Proposal/CleanCreative"   component={ProposalCleanCreative}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Proposal/BoldPitch"       component={ProposalBoldPitch}       durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Proposal/WarmExecutive"   component={ProposalWarmExecutive}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Proposal/MinimalCreative" component={ProposalMinimalCreative} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Proposal/NeonPitch"       component={ProposalNeonPitch}       durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Explainer ───────────────────────────────────────────────── */}
    <Composition id="Explainer/DarkCinematic"  component={ExplainerDarkCinematic}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Explainer/CleanWhiteboard"component={ExplainerCleanWhiteboard}durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Explainer/BoldProcess"    component={ExplainerBoldProcess}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Explainer/WarmWhiteboard" component={ExplainerWarmWhiteboard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Explainer/MinimalProcess" component={ExplainerMinimalProcess} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Explainer/NeonCinematic"  component={ExplainerNeonCinematic}  durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Portfolio ───────────────────────────────────────────────── */}
    <Composition id="Portfolio/DarkGallery"      component={PortfolioDarkGallery}      durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Portfolio/CleanCaseStudy"   component={PortfolioCleanCaseStudy}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Portfolio/BoldReel"         component={PortfolioBoldReel}         durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Portfolio/WarmGallery"      component={PortfolioWarmGallery}      durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Portfolio/MinimalCaseStudy" component={PortfolioMinimalCaseStudy} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Portfolio/NeonReel"         component={PortfolioNeonReel}         durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Onboarding ──────────────────────────────────────────────── */}
    <Composition id="Onboarding/DarkProfessional"   component={OnboardingDarkProfessional}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Onboarding/CleanProfessional"  component={OnboardingCleanProfessional}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Onboarding/BoldCreative"       component={OnboardingBoldCreative}       durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Onboarding/WarmFriendly"       component={OnboardingWarmFriendly}       durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Onboarding/MinimalProfessional"component={OnboardingMinimalProfessional}durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Onboarding/NeonCreative"       component={OnboardingNeonCreative}       durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Invoice ─────────────────────────────────────────────────── */}
    <Composition id="Invoice/DarkProfessional"   component={InvoiceDarkProfessional}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Invoice/CleanProfessional"  component={InvoiceCleanProfessional}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Invoice/BoldUrgent"         component={InvoiceBoldUrgent}         durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Invoice/WarmFriendly"       component={InvoiceWarmFriendly}       durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Invoice/MinimalProfessional"component={InvoiceMinimalProfessional}durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Invoice/NeonUrgent"         component={InvoiceNeonUrgent}         durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Social Proof ────────────────────────────────────────────── */}
    <Composition id="SocialProof/DarkMilestone"     component={SocialProofDarkMilestone}     durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="SocialProof/CleanAchievement"  component={SocialProofCleanAchievement}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="SocialProof/BoldAnnouncement"  component={SocialProofBoldAnnouncement}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="SocialProof/WarmMilestone"     component={SocialProofWarmMilestone}     durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="SocialProof/MinimalAchievement"component={SocialProofMinimalAchievement}durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="SocialProof/NeonAnnouncement"  component={SocialProofNeonAnnouncement}  durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Case Study ──────────────────────────────────────────────── */}
    <Composition id="CaseStudy/DarkNarrative"    component={CaseStudyDarkNarrative}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="CaseStudy/CleanComparison"  component={CaseStudyCleanComparison}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="CaseStudy/BoldSpotlight"    component={CaseStudyBoldSpotlight}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="CaseStudy/WarmNarrative"    component={CaseStudyWarmNarrative}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="CaseStudy/MinimalComparison"component={CaseStudyMinimalComparison}durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="CaseStudy/NeonSpotlight"    component={CaseStudyNeonSpotlight}    durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Pricing ─────────────────────────────────────────────────── */}
    <Composition id="Pricing/DarkTiers"       component={PricingDarkTiers}       durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Pricing/CleanComparison" component={PricingCleanComparison} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Pricing/BoldSpotlight"   component={PricingBoldSpotlight}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Pricing/WarmTiers"       component={PricingWarmTiers}       durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Pricing/MinimalComparison"component={PricingMinimalComparison}durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Pricing/NeonSpotlight"   component={PricingNeonSpotlight}   durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── FAQ ─────────────────────────────────────────────────────── */}
    <Composition id="FAQ/DarkAccordion" component={FAQDarkAccordion} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="FAQ/CleanCards"    component={FAQCleanCards}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="FAQ/BoldInterview" component={FAQBoldInterview} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="FAQ/WarmAccordion" component={FAQWarmAccordion} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="FAQ/MinimalCards"  component={FAQMinimalCards}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="FAQ/NeonInterview" component={FAQNeonInterview} durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Milestone ───────────────────────────────────────────────── */}
    <Composition id="Milestone/DarkCelebration" component={MilestoneDarkCelebration} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Milestone/CleanJourney"    component={MilestoneCleanJourney}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Milestone/BoldCelebration" component={MilestoneBoldCelebration} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Milestone/WarmGratitude"   component={MilestoneWarmGratitude}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Milestone/MinimalJourney"  component={MilestoneMinimalJourney}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Milestone/NeonCelebration" component={MilestoneNeonCelebration} durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Product Launch ──────────────────────────────────────────── */}
    <Composition id="ProductLaunch/DarkHeroReveal"  component={ProductLaunchDarkHeroReveal}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ProductLaunch/BoldHeroReveal"  component={ProductLaunchBoldHeroReveal}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ProductLaunch/DarkFeatureGrid" component={ProductLaunchDarkFeatureGrid} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ProductLaunch/BoldFeatureGrid" component={ProductLaunchBoldFeatureGrid} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ProductLaunch/DarkCountdown"   component={ProductLaunchDarkCountdown}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ProductLaunch/BoldCountdown"   component={ProductLaunchBoldCountdown}   durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Tutorial ────────────────────────────────────────────────── */}
    <Composition id="Tutorial/DarkNumberedSteps"  component={TutorialDarkNumberedSteps}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Tutorial/CleanNumberedSteps" component={TutorialCleanNumberedSteps} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Tutorial/DarkCardSequence"   component={TutorialDarkCardSequence}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Tutorial/CleanCardSequence"  component={TutorialCleanCardSequence}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Tutorial/DarkSplitDemo"      component={TutorialDarkSplitDemo}      durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Tutorial/CleanSplitDemo"     component={TutorialCleanSplitDemo}     durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Before/After ────────────────────────────────────────────── */}
    <Composition id="BeforeAfter/DarkSplitScreen"   component={BeforeAfterDarkSplitScreen}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="BeforeAfter/WarmSplitScreen"   component={BeforeAfterWarmSplitScreen}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="BeforeAfter/DarkRevealWipe"    component={BeforeAfterDarkRevealWipe}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="BeforeAfter/WarmRevealWipe"    component={BeforeAfterWarmRevealWipe}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="BeforeAfter/DarkMetricsCompare"component={BeforeAfterDarkMetricsCompare}durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="BeforeAfter/WarmMetricsCompare"component={BeforeAfterWarmMetricsCompare}durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Course Promo ────────────────────────────────────────────── */}
    <Composition id="CoursePromo/DarkOverview"    component={CoursePromoDarkOverview}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="CoursePromo/CleanOverview"   component={CoursePromoCleanOverview}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="CoursePromo/DarkCurriculum"  component={CoursePromoDarkCurriculum}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="CoursePromo/CleanCurriculum" component={CoursePromoCleanCurriculum} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="CoursePromo/DarkInstructor"  component={CoursePromoDarkInstructor}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="CoursePromo/CleanInstructor" component={CoursePromoCleanInstructor} durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Countdown Hype ──────────────────────────────────────────── */}
    <Composition id="CountdownHype/DarkTimer"   component={CountdownHypeDarkTimer}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="CountdownHype/NeonTimer"   component={CountdownHypeNeonTimer}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="CountdownHype/DarkTeaser"  component={CountdownHypeDarkTeaser}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="CountdownHype/NeonTeaser"  component={CountdownHypeNeonTeaser}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="CountdownHype/DarkUrgency" component={CountdownHypeDarkUrgency} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="CountdownHype/NeonUrgency" component={CountdownHypeNeonUrgency} durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Affiliate Review ────────────────────────────────────────── */}
    <Composition id="AffiliateReview/DarkScorecard"  component={AffiliateReviewDarkScorecard}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="AffiliateReview/BoldScorecard"  component={AffiliateReviewBoldScorecard}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="AffiliateReview/DarkComparison" component={AffiliateReviewDarkComparison} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="AffiliateReview/BoldComparison" component={AffiliateReviewBoldComparison} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="AffiliateReview/DarkVerdict"    component={AffiliateReviewDarkVerdict}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="AffiliateReview/BoldVerdict"    component={AffiliateReviewBoldVerdict}    durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Poll Quiz ───────────────────────────────────────────────── */}
    <Composition id="PollQuiz/DarkQuestionCard" component={PollQuizDarkQuestionCard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="PollQuiz/NeonQuestionCard" component={PollQuizNeonQuestionCard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="PollQuiz/DarkResultsBar"   component={PollQuizDarkResultsBar}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="PollQuiz/NeonResultsBar"   component={PollQuizNeonResultsBar}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="PollQuiz/DarkReveal"       component={PollQuizDarkReveal}       durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="PollQuiz/NeonReveal"       component={PollQuizNeonReveal}       durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Newsletter Promo ────────────────────────────────────────── */}
    <Composition id="NewsletterPromo/DarkSubscribeCta"      component={NewsletterPromoDarkSubscribeCta}     durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="NewsletterPromo/CleanSubscribeCta"     component={NewsletterPromoCleanSubscribeCta}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="NewsletterPromo/DarkIssuePreview"      component={NewsletterPromoDarkIssuePreview}     durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="NewsletterPromo/CleanIssuePreview"     component={NewsletterPromoCleanIssuePreview}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="NewsletterPromo/DarkTestimonialBlend"  component={NewsletterPromoDarkTestimonialBlend} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="NewsletterPromo/CleanTestimonialBlend" component={NewsletterPromoCleanTestimonialBlend}durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Podcast Audiogram ───────────────────────────────────────── */}
    <Composition id="PodcastAudiogram/DarkWaveform"     component={PodcastAudiogramDarkWaveform}     durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="PodcastAudiogram/WarmWaveform"     component={PodcastAudiogramWarmWaveform}     durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="PodcastAudiogram/DarkQuoteCard"    component={PodcastAudiogramDarkQuoteCard}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="PodcastAudiogram/WarmQuoteCard"    component={PodcastAudiogramWarmQuoteCard}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="PodcastAudiogram/DarkEpisodePromo" component={PodcastAudiogramDarkEpisodePromo} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="PodcastAudiogram/WarmEpisodePromo" component={PodcastAudiogramWarmEpisodePromo} durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Behind the Scenes ───────────────────────────────────────── */}
    <Composition id="BehindTheScenes/DarkSceneCards"  component={BehindTheScenesDarkSceneCards}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="BehindTheScenes/WarmSceneCards"  component={BehindTheScenesWarmSceneCards}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="BehindTheScenes/DarkTimeline"    component={BehindTheScenesDarkTimeline}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="BehindTheScenes/WarmTimeline"    component={BehindTheScenesWarmTimeline}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="BehindTheScenes/DarkProcessFlow" component={BehindTheScenesDarkProcessFlow} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="BehindTheScenes/WarmProcessFlow" component={BehindTheScenesWarmProcessFlow} durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Recipe Step ─────────────────────────────────────────────── */}
    <Composition id="RecipeStep/WarmIngredientList"  component={RecipeStepWarmIngredientList}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="RecipeStep/CleanIngredientList" component={RecipeStepCleanIngredientList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="RecipeStep/WarmStepSequence"    component={RecipeStepWarmStepSequence}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="RecipeStep/CleanStepSequence"   component={RecipeStepCleanStepSequence}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="RecipeStep/WarmSummaryCard"     component={RecipeStepWarmSummaryCard}     durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="RecipeStep/CleanSummaryCard"    component={RecipeStepCleanSummaryCard}    durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Listing ─────────────────────────────────────────────────── */}
    <Composition id="Listing/CleanShowcase"    component={ListingCleanShowcase}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Listing/MinimalShowcase"  component={ListingMinimalShowcase}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Listing/CleanFeatureGrid" component={ListingCleanFeatureGrid} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Listing/MinimalFeatureGrid"component={ListingMinimalFeatureGrid}durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Listing/CleanComparison"  component={ListingCleanComparison}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Listing/MinimalComparison"component={ListingMinimalComparison}durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Fitness Routine ─────────────────────────────────────────── */}
    <Composition id="FitnessRoutine/BoldExerciseList" component={FitnessRoutineBoldExerciseList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="FitnessRoutine/NeonExerciseList" component={FitnessRoutineNeonExerciseList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="FitnessRoutine/BoldTimerFocus"   component={FitnessRoutineBoldTimerFocus}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="FitnessRoutine/NeonTimerFocus"   component={FitnessRoutineNeonTimerFocus}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="FitnessRoutine/BoldCircuit"      component={FitnessRoutineBoldCircuit}      durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="FitnessRoutine/NeonCircuit"      component={FitnessRoutineNeonCircuit}      durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Music Visualizer ────────────────────────────────────────── */}
    <Composition id="MusicVisualizer/DarkBars"   component={MusicVisualizerDarkBars}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="MusicVisualizer/NeonBars"   component={MusicVisualizerNeonBars}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="MusicVisualizer/DarkRadial" component={MusicVisualizerDarkRadial} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="MusicVisualizer/NeonRadial" component={MusicVisualizerNeonRadial} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="MusicVisualizer/DarkLyrics" component={MusicVisualizerDarkLyrics} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="MusicVisualizer/NeonLyrics" component={MusicVisualizerNeonLyrics} durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Collaboration ───────────────────────────────────────────── */}
    <Composition id="Collaboration/DarkSplitScreen"  component={CollaborationDarkSplitScreen}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Collaboration/BoldSplitScreen"  component={CollaborationBoldSplitScreen}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Collaboration/DarkAnnouncement" component={CollaborationDarkAnnouncement} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Collaboration/BoldAnnouncement" component={CollaborationBoldAnnouncement} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Collaboration/DarkStatsMerge"   component={CollaborationDarkStatsMerge}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="Collaboration/BoldStatsMerge"   component={CollaborationBoldStatsMerge}   durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Sprint Dashboard ────────────────────────────────────────── */}
    <Composition id="SprintDashboard/KanbanDark"   component={SprintDashboardKanbanDark}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="SprintDashboard/KanbanBold"   component={SprintDashboardKanbanBold}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="SprintDashboard/VelocityDark" component={SprintDashboardVelocityDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="SprintDashboard/VelocityBold" component={SprintDashboardVelocityBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="SprintDashboard/BurndownDark" component={SprintDashboardBurndownDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="SprintDashboard/BurndownBold" component={SprintDashboardBurndownBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Feature Roadmap ─────────────────────────────────────────── */}
    <Composition id="FeatureRoadmap/TimelineDark"  component={FeatureRoadmapTimelineDark}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="FeatureRoadmap/TimelineClean" component={FeatureRoadmapTimelineClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="FeatureRoadmap/SwimlaneDark"  component={FeatureRoadmapSwimlaneDark}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="FeatureRoadmap/SwimlaneClean" component={FeatureRoadmapSwimlaneClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="FeatureRoadmap/GridDark"      component={FeatureRoadmapGridDark}      durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="FeatureRoadmap/GridClean"     component={FeatureRoadmapGridClean}     durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Platform Overview ───────────────────────────────────────── */}
    <Composition id="PlatformOverview/CommandCenterDark" component={PlatformOverviewCommandCenterDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="PlatformOverview/CommandCenterNeon" component={PlatformOverviewCommandCenterNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="PlatformOverview/ModuleGridDark"    component={PlatformOverviewModuleGridDark}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="PlatformOverview/ModuleGridNeon"    component={PlatformOverviewModuleGridNeon}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="PlatformOverview/StackDark"         component={PlatformOverviewStackDark}         durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="PlatformOverview/StackNeon"         component={PlatformOverviewStackNeon}         durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Agent Dashboard ─────────────────────────────────────────── */}
    <Composition id="AgentDashboard/ControlPanelDark" component={AgentDashboardControlPanelDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="AgentDashboard/ControlPanelNeon" component={AgentDashboardControlPanelNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="AgentDashboard/FlowDark"         component={AgentDashboardFlowDark}         durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="AgentDashboard/FlowNeon"         component={AgentDashboardFlowNeon}         durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="AgentDashboard/MatrixDark"       component={AgentDashboardMatrixDark}       durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="AgentDashboard/MatrixNeon"       component={AgentDashboardMatrixNeon}       durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Client Pipeline ─────────────────────────────────────────── */}
    <Composition id="ClientPipeline/FunnelDark"        component={ClientPipelineFunnelDark}        durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ClientPipeline/FunnelWarm"        component={ClientPipelineFunnelWarm}        durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ClientPipeline/PipelineBoardDark" component={ClientPipelinePipelineBoardDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ClientPipeline/PipelineBoardWarm" component={ClientPipelinePipelineBoardWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ClientPipeline/MetricsDark"       component={ClientPipelineMetricsDark}       durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ClientPipeline/MetricsWarm"       component={ClientPipelineMetricsWarm}       durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Integration Status ──────────────────────────────────────── */}
    <Composition id="IntegrationStatus/StatusWallDark"      component={IntegrationStatusStatusWallDark}      durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="IntegrationStatus/StatusWallClean"     component={IntegrationStatusStatusWallClean}     durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="IntegrationStatus/CategoryGroupsDark"  component={IntegrationStatusCategoryGroupsDark}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="IntegrationStatus/CategoryGroupsClean" component={IntegrationStatusCategoryGroupsClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="IntegrationStatus/HealthMonitorDark"   component={IntegrationStatusHealthMonitorDark}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="IntegrationStatus/HealthMonitorClean"  component={IntegrationStatusHealthMonitorClean}  durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Bug Tracker ─────────────────────────────────────────────── */}
    <Composition id="BugTracker/SeverityMatrixDark" component={BugTrackerSeverityMatrixDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="BugTracker/SeverityMatrixBold" component={BugTrackerSeverityMatrixBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="BugTracker/TriageBoardDark"    component={BugTrackerTriageBoardDark}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="BugTracker/TriageBoardBold"    component={BugTrackerTriageBoardBold}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="BugTracker/OverviewDark"       component={BugTrackerOverviewDark}       durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="BugTracker/OverviewBold"       component={BugTrackerOverviewBold}       durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Release Notes ───────────────────────────────────────────── */}
    <Composition id="ReleaseNotes/ChangelogDark"       component={ReleaseNotesChangelogDark}       durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ReleaseNotes/ChangelogClean"      component={ReleaseNotesChangelogClean}      durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ReleaseNotes/HighlightsDark"      component={ReleaseNotesHighlightsDark}      durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ReleaseNotes/HighlightsClean"     component={ReleaseNotesHighlightsClean}     durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ReleaseNotes/VersionCompareDark"  component={ReleaseNotesVersionCompareDark}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ReleaseNotes/VersionCompareClean" component={ReleaseNotesVersionCompareClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Effort Tracking ─────────────────────────────────────────── */}
    <Composition id="EffortTracking/TeamAllocationDark" component={EffortTrackingTeamAllocationDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="EffortTracking/TeamAllocationWarm" component={EffortTrackingTeamAllocationWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="EffortTracking/CapacityDark"       component={EffortTrackingCapacityDark}       durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="EffortTracking/CapacityWarm"       component={EffortTrackingCapacityWarm}       durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="EffortTracking/BreakdownDark"      component={EffortTrackingBreakdownDark}      durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="EffortTracking/BreakdownWarm"      component={EffortTrackingBreakdownWarm}      durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Pin Collection ──────────────────────────────────────────── */}
    <Composition id="PinCollection/CardGalleryWarm"   component={PinCollectionCardGalleryWarm}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="PinCollection/CardGalleryClean"  component={PinCollectionCardGalleryClean}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="PinCollection/MapListWarm"       component={PinCollectionMapListWarm}       durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="PinCollection/MapListClean"      component={PinCollectionMapListClean}      durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="PinCollection/CategoryGridWarm"  component={PinCollectionCategoryGridWarm}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="PinCollection/CategoryGridClean" component={PinCollectionCategoryGridClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Office Directory ────────────────────────────────────────── */}
    <Composition id="OfficeDirectory/WorldViewDark"    component={OfficeDirectoryWorldViewDark}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="OfficeDirectory/WorldViewClean"   component={OfficeDirectoryWorldViewClean}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="OfficeDirectory/CardListDark"     component={OfficeDirectoryCardListDark}     durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="OfficeDirectory/CardListClean"    component={OfficeDirectoryCardListClean}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="OfficeDirectory/RegionGroupsDark" component={OfficeDirectoryRegionGroupsDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="OfficeDirectory/RegionGroupsClean"component={OfficeDirectoryRegionGroupsClean}durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Travel Itinerary ────────────────────────────────────────── */}
    <Composition id="TravelItinerary/DayByDayWarm"      component={TravelItineraryDayByDayWarm}      durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="TravelItinerary/DayByDayBold"      component={TravelItineraryDayByDayBold}      durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="TravelItinerary/RouteOverviewWarm" component={TravelItineraryRouteOverviewWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="TravelItinerary/RouteOverviewBold" component={TravelItineraryRouteOverviewBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="TravelItinerary/HighlightsWarm"    component={TravelItineraryHighlightsWarm}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="TravelItinerary/HighlightsBold"    component={TravelItineraryHighlightsBold}    durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Store Locator ───────────────────────────────────────────── */}
    <Composition id="StoreLocator/FinderClean"     component={StoreLocatorFinderClean}     durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="StoreLocator/FinderMinimal"   component={StoreLocatorFinderMinimal}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="StoreLocator/MapPinsClean"    component={StoreLocatorMapPinsClean}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="StoreLocator/MapPinsMinimal"  component={StoreLocatorMapPinsMinimal}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="StoreLocator/DirectoryClean"  component={StoreLocatorDirectoryClean}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="StoreLocator/DirectoryMinimal"component={StoreLocatorDirectoryMinimal}durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Neighborhood Guide ──────────────────────────────────────── */}
    <Composition id="NeighborhoodGuide/ExplorerWarm"       component={NeighborhoodGuideExplorerWarm}       durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="NeighborhoodGuide/ExplorerNeon"       component={NeighborhoodGuideExplorerNeon}       durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="NeighborhoodGuide/HighlightsReelWarm" component={NeighborhoodGuideHighlightsReelWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="NeighborhoodGuide/HighlightsReelNeon" component={NeighborhoodGuideHighlightsReelNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="NeighborhoodGuide/OverviewWarm"       component={NeighborhoodGuideOverviewWarm}       durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="NeighborhoodGuide/OverviewNeon"       component={NeighborhoodGuideOverviewNeon}       durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Event Venue ─────────────────────────────────────────────── */}
    <Composition id="EventVenue/ScheduleMapDark"   component={EventVenueScheduleMapDark}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="EventVenue/ScheduleMapBold"   component={EventVenueScheduleMapBold}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="EventVenue/VenueCardsDark"    component={EventVenueVenueCardsDark}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="EventVenue/VenueCardsBold"    component={EventVenueVenueCardsBold}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="EventVenue/EventOverviewDark" component={EventVenueEventOverviewDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="EventVenue/EventOverviewBold" component={EventVenueEventOverviewBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Sprint Recap ────────────────────────────────────────────── */}
    <Composition id="SprintRecap/ShippedListDark"       component={SprintRecapShippedListDark}       durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="SprintRecap/ShippedListBold"       component={SprintRecapShippedListBold}       durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="SprintRecap/HighlightCardsDark"    component={SprintRecapHighlightCardsDark}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="SprintRecap/HighlightCardsBold"    component={SprintRecapHighlightCardsBold}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="SprintRecap/TeamContributionsDark" component={SprintRecapTeamContributionsDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="SprintRecap/TeamContributionsBold" component={SprintRecapTeamContributionsBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Deployment Status ───────────────────────────────────────── */}
    <Composition id="DeploymentStatus/EnvironmentCardsDark" component={DeploymentStatusEnvironmentCardsDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="DeploymentStatus/EnvironmentCardsNeon" component={DeploymentStatusEnvironmentCardsNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="DeploymentStatus/PipelineViewDark"     component={DeploymentStatusPipelineViewDark}     durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="DeploymentStatus/PipelineViewNeon"     component={DeploymentStatusPipelineViewNeon}     durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="DeploymentStatus/HealthDashboardDark"  component={DeploymentStatusHealthDashboardDark}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="DeploymentStatus/HealthDashboardNeon"  component={DeploymentStatusHealthDashboardNeon}  durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Velocity Chart ──────────────────────────────────────────── */}
    <Composition id="VelocityChart/BarChartDark"   component={VelocityChartBarChartDark}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="VelocityChart/BarChartClean"  component={VelocityChartBarChartClean}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="VelocityChart/TrendLineDark"  component={VelocityChartTrendLineDark}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="VelocityChart/TrendLineClean" component={VelocityChartTrendLineClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="VelocityChart/SummaryDark"    component={VelocityChartSummaryDark}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="VelocityChart/SummaryClean"   component={VelocityChartSummaryClean}   durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── QBR Dashboard ───────────────────────────────────────────── */}
    <Composition id="QBRDashboard/ExecutiveDark"    component={QBRDashboardExecutiveDark}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="QBRDashboard/ExecutiveClean"   component={QBRDashboardExecutiveClean}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="QBRDashboard/DetailedDark"     component={QBRDashboardDetailedDark}     durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="QBRDashboard/DetailedClean"    component={QBRDashboardDetailedClean}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="QBRDashboard/ComparisonDark"   component={QBRDashboardComparisonDark}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="QBRDashboard/ComparisonClean"  component={QBRDashboardComparisonClean}  durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Project Health ──────────────────────────────────────────── */}
    <Composition id="ProjectHealth/HealthScorecardDark" component={ProjectHealthHealthScorecardDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ProjectHealth/HealthScorecardWarm" component={ProjectHealthHealthScorecardWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ProjectHealth/WorkstreamViewDark"  component={ProjectHealthWorkstreamViewDark}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ProjectHealth/WorkstreamViewWarm"  component={ProjectHealthWorkstreamViewWarm}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ProjectHealth/ExecutiveSummaryDark"component={ProjectHealthExecutiveSummaryDark}durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ProjectHealth/ExecutiveSummaryWarm"component={ProjectHealthExecutiveSummaryWarm}durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Feature Flags ───────────────────────────────────────────── */}
    <Composition id="FeatureFlags/ExperimentBoardDark" component={FeatureFlagsExperimentBoardDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="FeatureFlags/ExperimentBoardNeon" component={FeatureFlagsExperimentBoardNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="FeatureFlags/ResultsViewDark"     component={FeatureFlagsResultsViewDark}     durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="FeatureFlags/ResultsViewNeon"     component={FeatureFlagsResultsViewNeon}     durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="FeatureFlags/RolloutTrackerDark"  component={FeatureFlagsRolloutTrackerDark}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="FeatureFlags/RolloutTrackerNeon"  component={FeatureFlagsRolloutTrackerNeon}  durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Bug Triage ──────────────────────────────────────────────── */}
    <Composition id="BugTriage/PriorityColumnsDark"   component={BugTriagePriorityColumnsDark}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="BugTriage/PriorityColumnsBold"   component={BugTriagePriorityColumnsBold}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="BugTriage/TriageListDark"        component={BugTriageTriageListDark}        durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="BugTriage/TriageListBold"        component={BugTriageTriageListBold}        durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="BugTriage/SummaryDashboardDark"  component={BugTriageSummaryDashboardDark}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="BugTriage/SummaryDashboardBold"  component={BugTriageSummaryDashboardBold}  durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Component Inventory ─────────────────────────────────────── */}
    <Composition id="ComponentInventory/ArchitectureGridDark"  component={ComponentInventoryArchitectureGridDark}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ComponentInventory/ArchitectureGridClean" component={ComponentInventoryArchitectureGridClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ComponentInventory/DependencyMapDark"     component={ComponentInventoryDependencyMapDark}     durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ComponentInventory/DependencyMapClean"    component={ComponentInventoryDependencyMapClean}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ComponentInventory/InventoryListDark"     component={ComponentInventoryInventoryListDark}     durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ComponentInventory/InventoryListClean"    component={ComponentInventoryInventoryListClean}    durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Concept Pitch ──────────────────────────────────────────── */}
    <Composition id="ConceptPitch/ArcDark"   component={ConceptPitchArcDark}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ConceptPitch/ArcBold"   component={ConceptPitchArcBold}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ConceptPitch/BoardDark" component={ConceptPitchBoardDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ConceptPitch/BoardBold" component={ConceptPitchBoardBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ConceptPitch/BriefDark" component={ConceptPitchBriefDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ConceptPitch/BriefBold" component={ConceptPitchBriefBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Thought Leadership ─────────────────────────────────────── */}
    <Composition id="ThoughtLeadership/EditorialDark"  component={ThoughtLeadershipEditorialDark}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ThoughtLeadership/EditorialClean" component={ThoughtLeadershipEditorialClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ThoughtLeadership/NarrativeDark"  component={ThoughtLeadershipNarrativeDark}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ThoughtLeadership/NarrativeClean" component={ThoughtLeadershipNarrativeClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ThoughtLeadership/KeynoteDark"    component={ThoughtLeadershipKeynoteDark}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="ThoughtLeadership/KeynoteClean"   component={ThoughtLeadershipKeynoteClean}   durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── Linda Mohamed Personal Deck ─────────────────────────────── */}
    <Composition id="LindaMohamed/Cover"          component={Folie1Cover}          durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="LindaMohamed/AboutMe"        component={Folie2AboutMe}        durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="LindaMohamed/WhatIOffer"     component={Folie3WhatIOffer}     durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="LindaMohamed/CostsPackages"  component={Folie4CostsPackages}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="LindaMohamedV2/Cover"        component={Folie1CoverV2}        durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="LindaMohamedV2/AboutMe"      component={Folie2AboutMeV2}      durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="LindaMohamedV2/WhatIOffer"   component={Folie3WhatIOfferV2}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="LindaMohamedV2/Costs"        component={Folie4CostsPackagesV2} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    <Composition id="LindaMohamedV2/Workshops"    component={Folie5WorkshopsV2}    durationInFrames={DUR} fps={FPS} width={W} height={H} />

    {/* ── YouTube Tutorial ───────────────────────────────────────── */}
    <Composition id="YouTubeTutorial/VideoFlowPipeline" component={VideoFlowPipelineTutorial} durationInFrames={DUR} fps={FPS} width={W} height={H} />
  </>
);
