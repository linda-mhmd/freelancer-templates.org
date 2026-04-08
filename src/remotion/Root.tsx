/**
 * Root.tsx - All freelancer template compositions
 *
 * Run locally:
 *   npx remotion studio src/remotion/index.ts
 *
 * Render a single composition:
 *   npx remotion render src/remotion/index.ts Testimonial-NeonSplit out/video.mp4
 */

import React from "react";
import { Composition, Folder } from "remotion";
// ── Linda Mohamed (personal deck) ────────────────────────────────
import { Folie1Cover, Folie2AboutMe, Folie3WhatIOffer, Folie4CostsPackages } from "./templates/lindamohamed/LindaMohamed";
import { Folie1CoverV2, Folie2AboutMeV2, Folie3WhatIOfferV2, Folie4CostsPackagesV2, Folie5WorkshopsV2 } from "./templates/lindamohamed/LindaMohamedV2";
// ── YouTube Tutorial ─────────────────────────────────────────────
import { VideoFlowPipelineTutorial } from "./templates/youtubetuorial/tutorials/VideoFlowPipeline";
// ── Community GameDay Europe ──────────────────────────────────────
import { Countdown } from "./GameDay/src/compositions/00-preshow/Countdown";
import { InfoLoop } from "./GameDay/src/compositions/00-preshow/InfoLoop";
import { MainEvent } from "./GameDay/src/compositions/01-main-event/MainEvent";
import { Gameplay } from "./GameDay/src/compositions/02-gameplay/Gameplay";
import { ClosingPreRendered } from "./GameDay/src/compositions/03-closing/ClosingPreRendered";
import { ClosingWinnersTemplate } from "./GameDay/src/compositions/03-closing/ClosingWinnersTemplate";
import { MarketingVideo } from "./GameDay/src/compositions/marketing/MarketingVideo";
import { QuestsLive } from "./GameDay/src/compositions/inserts/event-flow/QuestsLive";
import { HalfTime } from "./GameDay/src/compositions/inserts/event-flow/HalfTime";
import { FinalCountdown } from "./GameDay/src/compositions/inserts/event-flow/FinalCountdown";
import { GameExtended } from "./GameDay/src/compositions/inserts/event-flow/GameExtended";
import { LeaderboardHidden } from "./GameDay/src/compositions/inserts/event-flow/LeaderboardHidden";
import { ScoresCalculating } from "./GameDay/src/compositions/inserts/event-flow/ScoresCalculating";
import { BreakAnnouncement } from "./GameDay/src/compositions/inserts/event-flow/BreakAnnouncement";
import { WelcomeBack } from "./GameDay/src/compositions/inserts/event-flow/WelcomeBack";
import { FirstCompletion } from "./GameDay/src/compositions/inserts/commentary/FirstCompletion";
import { CloseRace } from "./GameDay/src/compositions/inserts/commentary/CloseRace";
import { ComebackAlert } from "./GameDay/src/compositions/inserts/commentary/ComebackAlert";
import { TopTeams } from "./GameDay/src/compositions/inserts/commentary/TopTeams";
import { CollectiveMilestone } from "./GameDay/src/compositions/inserts/commentary/CollectiveMilestone";
import { TeamSpotlight } from "./GameDay/src/compositions/inserts/commentary/TeamSpotlight";
import { QuestFixed } from "./GameDay/src/compositions/inserts/quest/QuestFixed";
import { QuestBroken } from "./GameDay/src/compositions/inserts/quest/QuestBroken";
import { QuestUpdate } from "./GameDay/src/compositions/inserts/quest/QuestUpdate";
import { QuestHint } from "./GameDay/src/compositions/inserts/quest/QuestHint";
import { NewQuestAvailable } from "./GameDay/src/compositions/inserts/quest/NewQuestAvailable";
import { SurveyReminder } from "./GameDay/src/compositions/inserts/quest/SurveyReminder";
import { StreamInterruption } from "./GameDay/src/compositions/inserts/ops/StreamInterruption";
import { TechnicalIssue } from "./GameDay/src/compositions/inserts/ops/TechnicalIssue";
import { Leaderboard } from "./GameDay/src/compositions/inserts/ops/Leaderboard";
import { ScoreCorrection } from "./GameDay/src/compositions/inserts/ops/ScoreCorrection";
import { GamemastersUpdate } from "./GameDay/src/compositions/inserts/ops/GamemastersUpdate";
import { StreamHostUpdate } from "./GameDay/src/compositions/inserts/people/StreamHostUpdate";
import { LocationShoutout } from "./GameDay/src/compositions/inserts/people/LocationShoutout";
import { ImportantReminder } from "./GameDay/src/compositions/inserts/people/ImportantReminder";

import { AffiliateReviewDarkScorecard, AffiliateReviewBoldScorecard, AffiliateReviewDarkComparison, AffiliateReviewBoldComparison, AffiliateReviewDarkVerdict, AffiliateReviewBoldVerdict, AffiliateReviewOceanScorecard, AffiliateReviewSunsetScorecard, AffiliateReviewForestComparison, AffiliateReviewRoseComparison, AffiliateReviewGoldVerdict, AffiliateReviewMidnightVerdict, AffiliateReviewCrimsonScorecard, AffiliateReviewLavenderScorecard, AffiliateReviewArcticComparison, AffiliateReviewEspressoComparison } from "./templates/affiliatereview/AffiliateReviewShowcase";
import { AgentDashboardControlPanelDark, AgentDashboardControlPanelNeon, AgentDashboardFlowDark, AgentDashboardFlowNeon, AgentDashboardMatrixDark, AgentDashboardMatrixNeon, AgentDashboardOceanControlPanel, AgentDashboardSunsetControlPanel, AgentDashboardForestFlow, AgentDashboardRoseFlow, AgentDashboardGoldMatrix, AgentDashboardMidnightMatrix, AgentDashboardCrimsonControlPanel, AgentDashboardLavenderControlPanel, AgentDashboardArcticFlow, AgentDashboardEspressoFlow } from "./templates/agentdashboard/AgentDashboardShowcase";
import { BeforeAfterDarkSplitScreen, BeforeAfterWarmSplitScreen, BeforeAfterDarkRevealWipe, BeforeAfterWarmRevealWipe, BeforeAfterDarkMetricsCompare, BeforeAfterWarmMetricsCompare, BeforeAfterOceanSplitScreen, BeforeAfterSunsetSplitScreen, BeforeAfterForestRevealWipe, BeforeAfterRoseRevealWipe, BeforeAfterGoldMetricsCompare, BeforeAfterMidnightMetricsCompare, BeforeAfterCrimsonSplitScreen, BeforeAfterLavenderSplitScreen, BeforeAfterArcticRevealWipe, BeforeAfterEspressoRevealWipe } from "./templates/beforeafter/BeforeAfterShowcase";
import { BehindTheScenesDarkSceneCards, BehindTheScenesWarmSceneCards, BehindTheScenesDarkTimeline, BehindTheScenesWarmTimeline, BehindTheScenesDarkProcessFlow, BehindTheScenesWarmProcessFlow, BehindTheScenesOceanSceneCards, BehindTheScenesSunsetSceneCards, BehindTheScenesForestTimeline, BehindTheScenesRoseTimeline, BehindTheScenesGoldProcessFlow, BehindTheScenesMidnightProcessFlow, BehindTheScenesCrimsonSceneCards, BehindTheScenesLavenderSceneCards, BehindTheScenesArcticTimeline, BehindTheScenesEspressoTimeline } from "./templates/behindthescenes/BehindTheScenesShowcase";
import { BugTrackerSeverityMatrixDark, BugTrackerSeverityMatrixBold, BugTrackerTriageBoardDark, BugTrackerTriageBoardBold, BugTrackerOverviewDark, BugTrackerOverviewBold, BugTrackerOceanSeverityMatrix, BugTrackerSunsetSeverityMatrix, BugTrackerForestTriageBoard, BugTrackerRoseTriageBoard, BugTrackerGoldOverview, BugTrackerMidnightOverview, BugTrackerCrimsonSeverityMatrix, BugTrackerLavenderSeverityMatrix, BugTrackerArcticTriageBoard, BugTrackerEspressoTriageBoard } from "./templates/bugtracker/BugTrackerShowcase";
import { BugTriagePriorityColumnsDark, BugTriagePriorityColumnsBold, BugTriageTriageListDark, BugTriageTriageListBold, BugTriageSummaryDashboardDark, BugTriageSummaryDashboardBold, BugTriageOceanPriorityColumns, BugTriageSunsetPriorityColumns, BugTriageForestTriageList, BugTriageRoseTriageList, BugTriageGoldSummaryDashboard, BugTriageMidnightSummaryDashboard, BugTriageCrimsonPriorityColumns, BugTriageLavenderPriorityColumns, BugTriageArcticTriageList, BugTriageEspressoTriageList } from "./templates/bugtriage/BugTriageShowcase";
import { CaseStudyDarkNarrative, CaseStudyCleanComparison, CaseStudyBoldSpotlight, CaseStudyWarmNarrative, CaseStudyMinimalComparison, CaseStudyNeonSpotlight, CaseStudyOceanNarrative, CaseStudySunsetSpotlight, CaseStudyForestNarrative, CaseStudyRoseSpotlight, CaseStudyGoldNarrative, CaseStudyMidnightNarrative, CaseStudyCrimsonSpotlight, CaseStudyLavenderComparison, CaseStudyArcticComparison, CaseStudyEspressoNarrative } from "./templates/casestudy/CaseStudyShowcase";
import { ClientPipelineFunnelDark, ClientPipelineFunnelWarm, ClientPipelinePipelineBoardDark, ClientPipelinePipelineBoardWarm, ClientPipelineMetricsDark, ClientPipelineMetricsWarm, ClientPipelineOceanFunnel, ClientPipelineSunsetFunnel, ClientPipelineForestPipelineBoard, ClientPipelineRosePipelineBoard, ClientPipelineGoldMetrics, ClientPipelineMidnightMetrics, ClientPipelineCrimsonFunnel, ClientPipelineLavenderFunnel, ClientPipelineArcticPipelineBoard, ClientPipelineEspressoPipelineBoard } from "./templates/clientpipeline/ClientPipelineShowcase";
import { CollaborationDarkSplitScreen, CollaborationBoldSplitScreen, CollaborationDarkAnnouncement, CollaborationBoldAnnouncement, CollaborationDarkStatsMerge, CollaborationBoldStatsMerge, CollaborationOceanSplitScreen, CollaborationSunsetSplitScreen, CollaborationForestAnnouncement, CollaborationRoseAnnouncement, CollaborationGoldStatsMerge, CollaborationMidnightStatsMerge, CollaborationCrimsonSplitScreen, CollaborationLavenderSplitScreen, CollaborationArcticAnnouncement, CollaborationEspressoAnnouncement } from "./templates/collaboration/CollaborationShowcase";
import { ComponentInventoryArchitectureGridDark, ComponentInventoryArchitectureGridClean, ComponentInventoryDependencyMapDark, ComponentInventoryDependencyMapClean, ComponentInventoryInventoryListDark, ComponentInventoryInventoryListClean, ComponentInventoryOceanArchitectureGrid, ComponentInventorySunsetArchitectureGrid, ComponentInventoryForestDependencyMap, ComponentInventoryRoseDependencyMap, ComponentInventoryGoldInventoryList, ComponentInventoryMidnightInventoryList, ComponentInventoryCrimsonArchitectureGrid, ComponentInventoryLavenderArchitectureGrid, ComponentInventoryArcticDependencyMap, ComponentInventoryEspressoDependencyMap } from "./templates/componentinventory/ComponentInventoryShowcase";
import { ConceptPitchArcDark, ConceptPitchArcBold, ConceptPitchBoardDark, ConceptPitchBoardBold, ConceptPitchBriefDark, ConceptPitchBriefBold, ConceptPitchOceanArc, ConceptPitchSunsetBoard, ConceptPitchForestBrief, ConceptPitchRoseArc, ConceptPitchGoldBoard, ConceptPitchMidnightBrief, ConceptPitchCrimsonArc, ConceptPitchLavenderBoard, ConceptPitchArcticBrief, ConceptPitchEspressoArc } from "./templates/conceptpitch/ConceptPitchShowcase";
import { CountdownHypeDarkTimer, CountdownHypeNeonTimer, CountdownHypeDarkTeaser, CountdownHypeNeonTeaser, CountdownHypeDarkUrgency, CountdownHypeNeonUrgency, CountdownHypeOceanTimer, CountdownHypeSunsetTimer, CountdownHypeForestTeaser, CountdownHypeRoseTeaser, CountdownHypeGoldUrgency, CountdownHypeMidnightUrgency, CountdownHypeCrimsonTimer, CountdownHypeLavenderTimer, CountdownHypeArcticTeaser, CountdownHypeEspressoTeaser } from "./templates/countdownhype/CountdownHypeShowcase";
import { CoursePromoDarkOverview, CoursePromoCleanOverview, CoursePromoDarkCurriculum, CoursePromoCleanCurriculum, CoursePromoDarkInstructor, CoursePromoCleanInstructor, CoursePromoOceanOverview, CoursePromoSunsetOverview, CoursePromoForestCurriculum, CoursePromoRoseCurriculum, CoursePromoGoldInstructor, CoursePromoMidnightInstructor, CoursePromoCrimsonOverview, CoursePromoLavenderOverview, CoursePromoArcticCurriculum, CoursePromoEspressoCurriculum } from "./templates/coursepromo/CoursePromoShowcase";
import { DeploymentStatusEnvironmentCardsDark, DeploymentStatusEnvironmentCardsNeon, DeploymentStatusPipelineViewDark, DeploymentStatusPipelineViewNeon, DeploymentStatusHealthDashboardDark, DeploymentStatusHealthDashboardNeon, DeploymentStatusOceanEnvironmentCards, DeploymentStatusSunsetEnvironmentCards, DeploymentStatusForestPipelineView, DeploymentStatusRosePipelineView, DeploymentStatusGoldHealthDashboard, DeploymentStatusMidnightHealthDashboard, DeploymentStatusCrimsonEnvironmentCards, DeploymentStatusLavenderEnvironmentCards, DeploymentStatusArcticPipelineView, DeploymentStatusEspressoPipelineView } from "./templates/deploymentstatus/DeploymentStatusShowcase";
import { EffortTrackingTeamAllocationDark, EffortTrackingTeamAllocationWarm, EffortTrackingCapacityDark, EffortTrackingCapacityWarm, EffortTrackingBreakdownDark, EffortTrackingBreakdownWarm, EffortTrackingOceanTeamAllocation, EffortTrackingSunsetTeamAllocation, EffortTrackingForestCapacity, EffortTrackingRoseCapacity, EffortTrackingGoldBreakdown, EffortTrackingMidnightBreakdown, EffortTrackingCrimsonTeamAllocation, EffortTrackingLavenderTeamAllocation, EffortTrackingArcticCapacity, EffortTrackingEspressoCapacity } from "./templates/efforttracking/EffortTrackingShowcase";
import { EventDarkHero, EventCleanSpeakers, EventBoldCountdown, EventWarmHero, EventMinimalSpeakers, EventNeonCountdown, EventOceanHero, EventSunsetSpeakers, EventForestCountdown, EventRoseHero, EventGoldSpeakers, EventMidnightCountdown, EventCrimsonHero, EventLavenderSpeakers, EventArcticCountdown, EventEspressoHero } from "./templates/event/EventShowcase";
import { EventVenueScheduleMapDark, EventVenueScheduleMapBold, EventVenueVenueCardsDark, EventVenueVenueCardsBold, EventVenueEventOverviewDark, EventVenueEventOverviewBold, EventVenueOceanScheduleMap, EventVenueSunsetScheduleMap, EventVenueForestVenueCards, EventVenueRoseVenueCards, EventVenueGoldEventOverview, EventVenueMidnightEventOverview, EventVenueCrimsonScheduleMap, EventVenueLavenderScheduleMap, EventVenueArcticVenueCards, EventVenueEspressoVenueCards } from "./templates/eventvenue/EventVenueShowcase";
import { ExplainerDarkCinematic, ExplainerCleanWhiteboard, ExplainerBoldProcess, ExplainerWarmWhiteboard, ExplainerMinimalProcess, ExplainerNeonCinematic, ExplainerOceanCinematic, ExplainerSunsetProcess, ExplainerForestProcess, ExplainerRoseProcess, ExplainerGoldCinematic, ExplainerMidnightWhiteboard, ExplainerCrimsonProcess, ExplainerLavenderWhiteboard, ExplainerArcticWhiteboard, ExplainerEspressoProcess } from "./templates/explainer/ExplainerShowcase";
import { FAQDarkAccordion, FAQCleanCards, FAQBoldInterview, FAQWarmAccordion, FAQMinimalCards, FAQNeonInterview, FAQOceanAccordion, FAQSunsetCards, FAQForestAccordion, FAQRoseCards, FAQGoldAccordion, FAQMidnightCards, FAQCrimsonAccordion, FAQLavenderCards, FAQArcticAccordion, FAQEspressoCards } from "./templates/faq/FAQShowcase";
import { FeatureFlagsExperimentBoardDark, FeatureFlagsExperimentBoardNeon, FeatureFlagsResultsViewDark, FeatureFlagsResultsViewNeon, FeatureFlagsRolloutTrackerDark, FeatureFlagsRolloutTrackerNeon, FeatureFlagsOceanExperimentBoard, FeatureFlagsSunsetExperimentBoard, FeatureFlagsForestResultsView, FeatureFlagsRoseResultsView, FeatureFlagsGoldRolloutTracker, FeatureFlagsMidnightRolloutTracker, FeatureFlagsCrimsonExperimentBoard, FeatureFlagsLavenderExperimentBoard, FeatureFlagsArcticResultsView, FeatureFlagsEspressoResultsView } from "./templates/featureflags/FeatureFlagsShowcase";
import { FeatureRoadmapTimelineDark, FeatureRoadmapTimelineClean, FeatureRoadmapSwimlaneDark, FeatureRoadmapSwimlaneClean, FeatureRoadmapGridDark, FeatureRoadmapGridClean, FeatureRoadmapOceanTimeline, FeatureRoadmapSunsetTimeline, FeatureRoadmapForestSwimlane, FeatureRoadmapRoseSwimlane, FeatureRoadmapGoldGrid, FeatureRoadmapMidnightGrid, FeatureRoadmapCrimsonTimeline, FeatureRoadmapLavenderTimeline, FeatureRoadmapArcticSwimlane, FeatureRoadmapEspressoSwimlane } from "./templates/featureroadmap/FeatureRoadmapShowcase";
import { FitnessRoutineBoldExerciseList, FitnessRoutineNeonExerciseList, FitnessRoutineBoldTimerFocus, FitnessRoutineNeonTimerFocus, FitnessRoutineBoldCircuit, FitnessRoutineNeonCircuit, FitnessRoutineOceanExerciseList, FitnessRoutineSunsetExerciseList, FitnessRoutineForestTimerFocus, FitnessRoutineRoseTimerFocus, FitnessRoutineGoldCircuit, FitnessRoutineMidnightCircuit, FitnessRoutineCrimsonExerciseList, FitnessRoutineLavenderExerciseList, FitnessRoutineArcticTimerFocus, FitnessRoutineEspressoTimerFocus } from "./templates/fitnessroutine/FitnessRoutineShowcase";
import { IntegrationStatusStatusWallDark, IntegrationStatusStatusWallClean, IntegrationStatusCategoryGroupsDark, IntegrationStatusCategoryGroupsClean, IntegrationStatusHealthMonitorDark, IntegrationStatusHealthMonitorClean, IntegrationStatusOceanStatusWall, IntegrationStatusSunsetStatusWall, IntegrationStatusForestCategoryGroups, IntegrationStatusRoseCategoryGroups, IntegrationStatusGoldHealthMonitor, IntegrationStatusMidnightHealthMonitor, IntegrationStatusCrimsonStatusWall, IntegrationStatusLavenderStatusWall, IntegrationStatusArcticCategoryGroups, IntegrationStatusEspressoCategoryGroups } from "./templates/integrationstatus/IntegrationStatusShowcase";
import { InvoiceDarkProfessional, InvoiceCleanProfessional, InvoiceBoldUrgent, InvoiceWarmFriendly, InvoiceMinimalProfessional, InvoiceNeonUrgent, InvoiceOceanProfessional, InvoiceSunsetFriendly, InvoiceForestProfessional, InvoiceRoseFriendly, InvoiceGoldProfessional, InvoiceMidnightProfessional, InvoiceCrimsonUrgent, InvoiceLavenderFriendly, InvoiceArcticProfessional, InvoiceEspressoFriendly } from "./templates/invoice/InvoiceShowcase";
import { ListingCleanShowcase, ListingMinimalShowcase, ListingCleanFeatureGrid, ListingMinimalFeatureGrid, ListingCleanComparison, ListingMinimalComparison, ListingOceanShowcase, ListingSunsetShowcase, ListingForestFeatureGrid, ListingRoseFeatureGrid, ListingGoldComparison, ListingMidnightComparison, ListingCrimsonShowcase, ListingLavenderShowcase, ListingArcticFeatureGrid, ListingEspressoFeatureGrid } from "./templates/listing/ListingShowcase";
import { MilestoneDarkCelebration, MilestoneCleanJourney, MilestoneBoldCelebration, MilestoneWarmGratitude, MilestoneMinimalJourney, MilestoneNeonCelebration, MilestoneOceanJourney, MilestoneSunsetCelebration, MilestoneForestJourney, MilestoneRoseCelebration, MilestoneGoldGratitude, MilestoneMidnightJourney, MilestoneCrimsonCelebration, MilestoneLavenderJourney, MilestoneArcticJourney, MilestoneEspressoGratitude } from "./templates/milestone/MilestoneShowcase";
import { MusicVisualizerDarkBars, MusicVisualizerNeonBars, MusicVisualizerDarkRadial, MusicVisualizerNeonRadial, MusicVisualizerDarkLyrics, MusicVisualizerNeonLyrics, MusicVisualizerOceanBars, MusicVisualizerSunsetBars, MusicVisualizerForestRadial, MusicVisualizerRoseRadial, MusicVisualizerGoldLyrics, MusicVisualizerMidnightLyrics, MusicVisualizerCrimsonBars, MusicVisualizerLavenderBars, MusicVisualizerArcticRadial, MusicVisualizerEspressoRadial } from "./templates/musicvisualizer/MusicVisualizerShowcase";
import { NeighborhoodGuideExplorerWarm, NeighborhoodGuideExplorerNeon, NeighborhoodGuideHighlightsReelWarm, NeighborhoodGuideHighlightsReelNeon, NeighborhoodGuideOverviewWarm, NeighborhoodGuideOverviewNeon, NeighborhoodGuideOceanExplorer, NeighborhoodGuideSunsetExplorer, NeighborhoodGuideForestHighlightsReel, NeighborhoodGuideRoseHighlightsReel, NeighborhoodGuideGoldOverview, NeighborhoodGuideMidnightOverview, NeighborhoodGuideCrimsonExplorer, NeighborhoodGuideLavenderExplorer, NeighborhoodGuideArcticHighlightsReel, NeighborhoodGuideEspressoHighlightsReel } from "./templates/neighborhoodguide/NeighborhoodGuideShowcase";
import { NewsletterPromoDarkSubscribeCta, NewsletterPromoCleanSubscribeCta, NewsletterPromoDarkIssuePreview, NewsletterPromoCleanIssuePreview, NewsletterPromoDarkTestimonialBlend, NewsletterPromoCleanTestimonialBlend, NewsletterPromoOceanSubscribeCta, NewsletterPromoSunsetSubscribeCta, NewsletterPromoForestIssuePreview, NewsletterPromoRoseIssuePreview, NewsletterPromoGoldTestimonialBlend, NewsletterPromoMidnightTestimonialBlend, NewsletterPromoCrimsonSubscribeCta, NewsletterPromoLavenderSubscribeCta, NewsletterPromoArcticIssuePreview, NewsletterPromoEspressoIssuePreview } from "./templates/newsletterpromo/NewsletterPromoShowcase";
import { OfficeDirectoryWorldViewDark, OfficeDirectoryWorldViewClean, OfficeDirectoryCardListDark, OfficeDirectoryCardListClean, OfficeDirectoryRegionGroupsDark, OfficeDirectoryRegionGroupsClean, OfficeDirectoryOceanWorldView, OfficeDirectorySunsetWorldView, OfficeDirectoryForestCardList, OfficeDirectoryRoseCardList, OfficeDirectoryGoldRegionGroups, OfficeDirectoryMidnightRegionGroups, OfficeDirectoryCrimsonWorldView, OfficeDirectoryLavenderWorldView, OfficeDirectoryArcticCardList, OfficeDirectoryEspressoCardList } from "./templates/officedirectory/OfficeDirectoryShowcase";
import { OnboardingDarkProfessional, OnboardingCleanProfessional, OnboardingBoldCreative, OnboardingWarmFriendly, OnboardingMinimalProfessional, OnboardingNeonCreative, OnboardingOceanProfessional, OnboardingSunsetCreative, OnboardingForestProfessional, OnboardingRoseCreative, OnboardingGoldProfessional, OnboardingMidnightProfessional, OnboardingCrimsonCreative, OnboardingLavenderFriendly, OnboardingArcticProfessional, OnboardingEspressoFriendly } from "./templates/onboarding/OnboardingShowcase";
import { PinCollectionCardGalleryWarm, PinCollectionCardGalleryClean, PinCollectionMapListWarm, PinCollectionMapListClean, PinCollectionCategoryGridWarm, PinCollectionCategoryGridClean, PinCollectionOceanCardGallery, PinCollectionSunsetMapList, PinCollectionForestCardGallery, PinCollectionRoseCategoryGrid, PinCollectionGoldMapList, PinCollectionMidnightCardGallery, PinCollectionCrimsonCategoryGrid, PinCollectionLavenderMapList, PinCollectionArcticCardGallery, PinCollectionEspressoCategoryGrid } from "./templates/pincollection/PinCollectionShowcase";
import { PlatformOverviewCommandCenterDark, PlatformOverviewCommandCenterNeon, PlatformOverviewModuleGridDark, PlatformOverviewModuleGridNeon, PlatformOverviewStackDark, PlatformOverviewStackNeon, PlatformOverviewOceanCommandCenter, PlatformOverviewSunsetCommandCenter, PlatformOverviewForestModuleGrid, PlatformOverviewRoseModuleGrid, PlatformOverviewGoldStack, PlatformOverviewMidnightStack, PlatformOverviewCrimsonCommandCenter, PlatformOverviewLavenderCommandCenter, PlatformOverviewArcticModuleGrid, PlatformOverviewEspressoModuleGrid } from "./templates/platformoverview/PlatformOverviewShowcase";
import { PodcastAudiogramDarkWaveform, PodcastAudiogramWarmWaveform, PodcastAudiogramDarkQuoteCard, PodcastAudiogramWarmQuoteCard, PodcastAudiogramDarkEpisodePromo, PodcastAudiogramWarmEpisodePromo, PodcastAudiogramOceanWaveform, PodcastAudiogramSunsetWaveform, PodcastAudiogramForestQuoteCard, PodcastAudiogramRoseQuoteCard, PodcastAudiogramGoldEpisodePromo, PodcastAudiogramMidnightEpisodePromo, PodcastAudiogramCrimsonWaveform, PodcastAudiogramLavenderWaveform, PodcastAudiogramArcticQuoteCard, PodcastAudiogramEspressoQuoteCard } from "./templates/podcastaudiogram/PodcastAudiogramShowcase";
import { PollQuizDarkQuestionCard, PollQuizNeonQuestionCard, PollQuizDarkResultsBar, PollQuizNeonResultsBar, PollQuizDarkReveal, PollQuizNeonReveal, PollQuizOceanQuestionCard, PollQuizSunsetQuestionCard, PollQuizForestResultsBar, PollQuizRoseResultsBar, PollQuizGoldReveal, PollQuizMidnightReveal, PollQuizCrimsonQuestionCard, PollQuizLavenderQuestionCard, PollQuizArcticResultsBar, PollQuizEspressoResultsBar } from "./templates/pollquiz/PollQuizShowcase";
import { PortfolioDarkGallery, PortfolioCleanCaseStudy, PortfolioBoldReel, PortfolioWarmGallery, PortfolioMinimalCaseStudy, PortfolioNeonReel, PortfolioOceanCaseStudy, PortfolioSunsetGallery, PortfolioForestCaseStudy, PortfolioRoseGallery, PortfolioGoldCaseStudy, PortfolioMidnightCaseStudy, PortfolioCrimsonReel, PortfolioLavenderGallery, PortfolioArcticCaseStudy, PortfolioEspressoGallery } from "./templates/portfolio/PortfolioShowcase";
import { PricingDarkTiers, PricingCleanComparison, PricingBoldSpotlight, PricingWarmTiers, PricingMinimalComparison, PricingNeonSpotlight, PricingOceanTiers, PricingSunsetComparison, PricingForestTiers, PricingRoseComparison, PricingGoldTiers, PricingMidnightComparison, PricingCrimsonTiers, PricingLavenderComparison, PricingArcticTiers, PricingEspressoComparison } from "./templates/pricing/PricingShowcase";
import { ProductLaunchDarkHeroReveal, ProductLaunchBoldHeroReveal, ProductLaunchDarkFeatureGrid, ProductLaunchBoldFeatureGrid, ProductLaunchDarkCountdown, ProductLaunchBoldCountdown, ProductLaunchOceanHeroReveal, ProductLaunchSunsetHeroReveal, ProductLaunchForestFeatureGrid, ProductLaunchRoseFeatureGrid, ProductLaunchGoldCountdown, ProductLaunchMidnightCountdown, ProductLaunchCrimsonHeroReveal, ProductLaunchLavenderHeroReveal, ProductLaunchArcticFeatureGrid, ProductLaunchEspressoFeatureGrid } from "./templates/productlaunch/ProductLaunchShowcase";
import { ProjectHealthHealthScorecardDark, ProjectHealthHealthScorecardWarm, ProjectHealthWorkstreamViewDark, ProjectHealthWorkstreamViewWarm, ProjectHealthExecutiveSummaryDark, ProjectHealthExecutiveSummaryWarm, ProjectHealthOceanHealthScorecard, ProjectHealthSunsetHealthScorecard, ProjectHealthForestWorkstreamView, ProjectHealthRoseWorkstreamView, ProjectHealthGoldExecutiveSummary, ProjectHealthMidnightExecutiveSummary, ProjectHealthCrimsonHealthScorecard, ProjectHealthLavenderHealthScorecard, ProjectHealthArcticWorkstreamView, ProjectHealthEspressoWorkstreamView } from "./templates/projecthealth/ProjectHealthShowcase";
import { ProposalDarkExecutive, ProposalCleanCreative, ProposalBoldPitch, ProposalWarmExecutive, ProposalMinimalCreative, ProposalNeonPitch, ProposalOceanExecutive, ProposalSunsetCreative, ProposalForestExecutive, ProposalRoseCreative, ProposalGoldExecutive, ProposalMidnightExecutive, ProposalCrimsonPitch, ProposalLavenderCreative, ProposalArcticCreative, ProposalEspressoExecutive } from "./templates/proposal/ProposalShowcase";
import { QBRDashboardExecutiveDark, QBRDashboardExecutiveClean, QBRDashboardDetailedDark, QBRDashboardDetailedClean, QBRDashboardComparisonDark, QBRDashboardComparisonClean, QBRDashboardOceanExecutive, QBRDashboardSunsetExecutive, QBRDashboardForestDetailed, QBRDashboardRoseDetailed, QBRDashboardGoldComparison, QBRDashboardMidnightComparison, QBRDashboardCrimsonExecutive, QBRDashboardLavenderExecutive, QBRDashboardArcticDetailed, QBRDashboardEspressoDetailed } from "./templates/qbrdashboard/QBRDashboardShowcase";
import { RecapDarkDashboard, RecapCleanTimeline, RecapBoldCards, RecapWarmDashboard, RecapMinimalCards, RecapNeonTimeline, RecapOceanDashboard, RecapSunsetCards, RecapForestTimeline, RecapRoseCards, RecapGoldDashboard, RecapMidnightDashboard, RecapCrimsonCards, RecapLavenderTimeline, RecapArcticTimeline, RecapEspressoDashboard } from "./templates/recap/RecapShowcase";
import { RecipeStepWarmIngredientList, RecipeStepCleanIngredientList, RecipeStepWarmStepSequence, RecipeStepCleanStepSequence, RecipeStepWarmSummaryCard, RecipeStepCleanSummaryCard, RecipeStepOceanIngredientList, RecipeStepSunsetIngredientList, RecipeStepForestStepSequence, RecipeStepRoseStepSequence, RecipeStepGoldSummaryCard, RecipeStepMidnightSummaryCard, RecipeStepCrimsonIngredientList, RecipeStepLavenderIngredientList, RecipeStepArcticStepSequence, RecipeStepEspressoStepSequence } from "./templates/recipestep/RecipeStepShowcase";
import { ReleaseNotesChangelogDark, ReleaseNotesChangelogClean, ReleaseNotesHighlightsDark, ReleaseNotesHighlightsClean, ReleaseNotesVersionCompareDark, ReleaseNotesVersionCompareClean, ReleaseNotesOceanChangelog, ReleaseNotesSunsetChangelog, ReleaseNotesForestHighlights, ReleaseNotesRoseHighlights, ReleaseNotesGoldVersionCompare, ReleaseNotesMidnightVersionCompare, ReleaseNotesCrimsonChangelog, ReleaseNotesLavenderChangelog, ReleaseNotesArcticHighlights, ReleaseNotesEspressoHighlights } from "./templates/releasenotes/ReleaseNotesShowcase";
import { SocialProofDarkMilestone, SocialProofCleanAchievement, SocialProofBoldAnnouncement, SocialProofWarmMilestone, SocialProofMinimalAchievement, SocialProofNeonAnnouncement, SocialProofOceanAchievement, SocialProofSunsetAnnouncement, SocialProofForestMilestone, SocialProofRoseAnnouncement, SocialProofGoldAchievement, SocialProofMidnightAchievement, SocialProofCrimsonAnnouncement, SocialProofLavenderMilestone, SocialProofArcticAchievement, SocialProofEspressoMilestone } from "./templates/socialproof/SocialProofShowcase";
import { SprintDashboardKanbanDark, SprintDashboardKanbanBold, SprintDashboardVelocityDark, SprintDashboardVelocityBold, SprintDashboardBurndownDark, SprintDashboardBurndownBold, SprintDashboardOceanKanban, SprintDashboardSunsetKanban, SprintDashboardForestVelocity, SprintDashboardRoseVelocity, SprintDashboardGoldBurndown, SprintDashboardMidnightBurndown, SprintDashboardCrimsonKanban, SprintDashboardLavenderKanban, SprintDashboardArcticVelocity, SprintDashboardEspressoVelocity } from "./templates/sprintdashboard/SprintDashboardShowcase";
import { SprintRecapShippedListDark, SprintRecapShippedListBold, SprintRecapHighlightCardsDark, SprintRecapHighlightCardsBold, SprintRecapTeamContributionsDark, SprintRecapTeamContributionsBold, SprintRecapOceanShippedList, SprintRecapSunsetShippedList, SprintRecapForestHighlightCards, SprintRecapRoseHighlightCards, SprintRecapGoldTeamContributions, SprintRecapMidnightTeamContributions, SprintRecapCrimsonShippedList, SprintRecapLavenderShippedList, SprintRecapArcticHighlightCards, SprintRecapEspressoHighlightCards } from "./templates/sprintrecap/SprintRecapShowcase";
import { StoreLocatorFinderClean, StoreLocatorFinderMinimal, StoreLocatorMapPinsClean, StoreLocatorMapPinsMinimal, StoreLocatorDirectoryClean, StoreLocatorDirectoryMinimal, StoreLocatorOceanFinder, StoreLocatorSunsetMapPins, StoreLocatorForestDirectory, StoreLocatorRoseFinder, StoreLocatorGoldMapPins, StoreLocatorMidnightDirectory, StoreLocatorCrimsonFinder, StoreLocatorLavenderMapPins, StoreLocatorArcticDirectory, StoreLocatorEspressoFinder } from "./templates/storelocator/StoreLocatorShowcase";
import { TestimonialDarkCentered, TestimonialCleanSplit, TestimonialBoldEditorial, TestimonialWarmCentered, TestimonialMinimalEditorial, TestimonialNeonSplit, TestimonialOceanCentered, TestimonialSunsetSplit, TestimonialForestCentered, TestimonialRoseEditorial, TestimonialGoldCentered, TestimonialMidnightCentered, TestimonialCrimsonEditorial, TestimonialLavenderSplit, TestimonialArcticSplit, TestimonialEspressoCentered } from "./templates/testimonial/TestimonialShowcase";
import { ThoughtLeadershipEditorialDark, ThoughtLeadershipEditorialClean, ThoughtLeadershipNarrativeDark, ThoughtLeadershipNarrativeClean, ThoughtLeadershipKeynoteDark, ThoughtLeadershipKeynoteClean, ThoughtLeadershipOceanEditorial, ThoughtLeadershipSunsetNarrative, ThoughtLeadershipForestKeynote, ThoughtLeadershipRoseEditorial, ThoughtLeadershipGoldNarrative, ThoughtLeadershipMidnightKeynote, ThoughtLeadershipCrimsonEditorial, ThoughtLeadershipLavenderNarrative, ThoughtLeadershipArcticKeynote, ThoughtLeadershipEspressoEditorial } from "./templates/thoughtleadership/ThoughtLeadershipShowcase";
import { TravelItineraryDayByDayWarm, TravelItineraryDayByDayBold, TravelItineraryRouteOverviewWarm, TravelItineraryRouteOverviewBold, TravelItineraryHighlightsWarm, TravelItineraryHighlightsBold, TravelItineraryOceanDayByDay, TravelItinerarySunsetDayByDay, TravelItineraryForestRouteOverview, TravelItineraryRoseRouteOverview, TravelItineraryGoldHighlights, TravelItineraryMidnightHighlights, TravelItineraryCrimsonDayByDay, TravelItineraryLavenderDayByDay, TravelItineraryArcticRouteOverview, TravelItineraryEspressoRouteOverview } from "./templates/travelitinerary/TravelItineraryShowcase";
import { TutorialDarkNumberedSteps, TutorialCleanNumberedSteps, TutorialDarkCardSequence, TutorialCleanCardSequence, TutorialDarkSplitDemo, TutorialCleanSplitDemo, TutorialOceanNumberedSteps, TutorialSunsetNumberedSteps, TutorialForestCardSequence, TutorialRoseCardSequence, TutorialGoldSplitDemo, TutorialMidnightSplitDemo, TutorialCrimsonNumberedSteps, TutorialLavenderNumberedSteps, TutorialArcticCardSequence, TutorialEspressoCardSequence } from "./templates/tutorial/TutorialShowcase";
import { VelocityChartBarChartDark, VelocityChartBarChartClean, VelocityChartTrendLineDark, VelocityChartTrendLineClean, VelocityChartSummaryDark, VelocityChartSummaryClean, VelocityChartOceanBarChart, VelocityChartSunsetBarChart, VelocityChartForestTrendLine, VelocityChartRoseTrendLine, VelocityChartGoldSummary, VelocityChartMidnightSummary, VelocityChartCrimsonBarChart, VelocityChartLavenderBarChart, VelocityChartArcticTrendLine, VelocityChartEspressoTrendLine } from "./templates/velocitychart/VelocityChartShowcase";

// ── Effect Templates (adapted from reactvideoeditor/remotion-templates) ──
import { AnimatedListDark, AnimatedListClean, AnimatedListBold, AnimatedListWarm, AnimatedListMinimal, AnimatedListNeon, AnimatedListOcean, AnimatedListSunset, AnimatedListForest, AnimatedListRose, AnimatedListGold, AnimatedListMidnight, AnimatedListCrimson, AnimatedListLavender, AnimatedListArctic, AnimatedListEspresso } from "./templates/animatedlist/AnimatedListShowcase";
import { AnimatedTextDark, AnimatedTextClean, AnimatedTextBold, AnimatedTextWarm, AnimatedTextMinimal, AnimatedTextNeon, AnimatedTextOcean, AnimatedTextSunset, AnimatedTextForest, AnimatedTextRose, AnimatedTextGold, AnimatedTextMidnight, AnimatedTextCrimson, AnimatedTextLavender, AnimatedTextArctic, AnimatedTextEspresso } from "./templates/animatedtext/AnimatedTextShowcase";
import { BounceTextDark, BounceTextClean, BounceTextBold, BounceTextWarm, BounceTextMinimal, BounceTextNeon, BounceTextOcean, BounceTextSunset, BounceTextForest, BounceTextRose, BounceTextGold, BounceTextMidnight, BounceTextCrimson, BounceTextLavender, BounceTextArctic, BounceTextEspresso } from "./templates/bouncetext/BounceTextShowcase";
import { BubblePopTextDark, BubblePopTextClean, BubblePopTextBold, BubblePopTextWarm, BubblePopTextMinimal, BubblePopTextNeon, BubblePopTextOcean, BubblePopTextSunset, BubblePopTextForest, BubblePopTextRose, BubblePopTextGold, BubblePopTextMidnight, BubblePopTextCrimson, BubblePopTextLavender, BubblePopTextArctic, BubblePopTextEspresso } from "./templates/bubblepoptext/BubblePopTextShowcase";
import { CardFlipDark, CardFlipClean, CardFlipBold, CardFlipWarm, CardFlipMinimal, CardFlipNeon, CardFlipOcean, CardFlipSunset, CardFlipForest, CardFlipRose, CardFlipGold, CardFlipMidnight, CardFlipCrimson, CardFlipLavender, CardFlipArctic, CardFlipEspresso } from "./templates/cardflip/CardFlipShowcase";
import { FloatingBubbleDark, FloatingBubbleClean, FloatingBubbleBold, FloatingBubbleWarm, FloatingBubbleMinimal, FloatingBubbleNeon, FloatingBubbleOcean, FloatingBubbleSunset, FloatingBubbleForest, FloatingBubbleRose, FloatingBubbleGold, FloatingBubbleMidnight, FloatingBubbleCrimson, FloatingBubbleLavender, FloatingBubbleArctic, FloatingBubbleEspresso } from "./templates/floatingbubble/FloatingBubbleShowcase";
import { GeometricPatternsDark, GeometricPatternsClean, GeometricPatternsBold, GeometricPatternsWarm, GeometricPatternsMinimal, GeometricPatternsNeon, GeometricPatternsOcean, GeometricPatternsSunset, GeometricPatternsForest, GeometricPatternsRose, GeometricPatternsGold, GeometricPatternsMidnight, GeometricPatternsCrimson, GeometricPatternsLavender, GeometricPatternsArctic, GeometricPatternsEspresso } from "./templates/geometricpatterns/GeometricPatternsShowcase";
import { GlitchTextDark, GlitchTextClean, GlitchTextBold, GlitchTextWarm, GlitchTextMinimal, GlitchTextNeon, GlitchTextOcean, GlitchTextSunset, GlitchTextForest, GlitchTextRose, GlitchTextGold, GlitchTextMidnight, GlitchTextCrimson, GlitchTextLavender, GlitchTextArctic, GlitchTextEspresso } from "./templates/glitchtext/GlitchTextShowcase";
import { LiquidWaveDark, LiquidWaveClean, LiquidWaveBold, LiquidWaveWarm, LiquidWaveMinimal, LiquidWaveNeon, LiquidWaveOcean, LiquidWaveSunset, LiquidWaveForest, LiquidWaveRose, LiquidWaveGold, LiquidWaveMidnight, LiquidWaveCrimson, LiquidWaveLavender, LiquidWaveArctic, LiquidWaveEspresso } from "./templates/liquidwave/LiquidWaveShowcase";
import { MatrixRainDark, MatrixRainClean, MatrixRainBold, MatrixRainWarm, MatrixRainMinimal, MatrixRainNeon, MatrixRainOcean, MatrixRainSunset, MatrixRainForest, MatrixRainRose, MatrixRainGold, MatrixRainMidnight, MatrixRainCrimson, MatrixRainLavender, MatrixRainArctic, MatrixRainEspresso } from "./templates/matrixrain/MatrixRainShowcase";
import { ParticleExplosionDark, ParticleExplosionClean, ParticleExplosionBold, ParticleExplosionWarm, ParticleExplosionMinimal, ParticleExplosionNeon, ParticleExplosionOcean, ParticleExplosionSunset, ParticleExplosionForest, ParticleExplosionRose, ParticleExplosionGold, ParticleExplosionMidnight, ParticleExplosionCrimson, ParticleExplosionLavender, ParticleExplosionArctic, ParticleExplosionEspresso } from "./templates/particleexplosion/ParticleExplosionShowcase";
import { PulsingTextDark, PulsingTextClean, PulsingTextBold, PulsingTextWarm, PulsingTextMinimal, PulsingTextNeon, PulsingTextOcean, PulsingTextSunset, PulsingTextForest, PulsingTextRose, PulsingTextGold, PulsingTextMidnight, PulsingTextCrimson, PulsingTextLavender, PulsingTextArctic, PulsingTextEspresso } from "./templates/pulsingtext/PulsingTextShowcase";
import { SlideTextDark, SlideTextClean, SlideTextBold, SlideTextWarm, SlideTextMinimal, SlideTextNeon, SlideTextOcean, SlideTextSunset, SlideTextForest, SlideTextRose, SlideTextGold, SlideTextMidnight, SlideTextCrimson, SlideTextLavender, SlideTextArctic, SlideTextEspresso } from "./templates/slidetext/SlideTextShowcase";
import { SoundWaveDark, SoundWaveClean, SoundWaveBold, SoundWaveWarm, SoundWaveMinimal, SoundWaveNeon, SoundWaveOcean, SoundWaveSunset, SoundWaveForest, SoundWaveRose, SoundWaveGold, SoundWaveMidnight, SoundWaveCrimson, SoundWaveLavender, SoundWaveArctic, SoundWaveEspresso } from "./templates/soundwave/SoundWaveShowcase";
import { TypewriterSubtitleDark, TypewriterSubtitleClean, TypewriterSubtitleBold, TypewriterSubtitleWarm, TypewriterSubtitleMinimal, TypewriterSubtitleNeon, TypewriterSubtitleOcean, TypewriterSubtitleSunset, TypewriterSubtitleForest, TypewriterSubtitleRose, TypewriterSubtitleGold, TypewriterSubtitleMidnight, TypewriterSubtitleCrimson, TypewriterSubtitleLavender, TypewriterSubtitleArctic, TypewriterSubtitleEspresso } from "./templates/typewritersubtitle/TypewriterSubtitleShowcase";

// Standard composition defaults: 1280x720, 30fps, 10s
const W = 1280, H = 720, FPS = 30, DUR = 300;

export const RemotionRoot: React.FC = () => (
  <>
    <Folder name="Affiliate-Review">
      <Composition id="AffiliateReview-DarkScorecard" component={AffiliateReviewDarkScorecard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AffiliateReview-BoldScorecard" component={AffiliateReviewBoldScorecard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AffiliateReview-DarkComparison" component={AffiliateReviewDarkComparison} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AffiliateReview-BoldComparison" component={AffiliateReviewBoldComparison} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AffiliateReview-DarkVerdict" component={AffiliateReviewDarkVerdict} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AffiliateReview-BoldVerdict" component={AffiliateReviewBoldVerdict} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AffiliateReview-OceanScorecard" component={AffiliateReviewOceanScorecard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AffiliateReview-SunsetScorecard" component={AffiliateReviewSunsetScorecard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AffiliateReview-ForestComparison" component={AffiliateReviewForestComparison} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AffiliateReview-RoseComparison" component={AffiliateReviewRoseComparison} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AffiliateReview-GoldVerdict" component={AffiliateReviewGoldVerdict} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AffiliateReview-MidnightVerdict" component={AffiliateReviewMidnightVerdict} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AffiliateReview-CrimsonScorecard" component={AffiliateReviewCrimsonScorecard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AffiliateReview-LavenderScorecard" component={AffiliateReviewLavenderScorecard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AffiliateReview-ArcticComparison" component={AffiliateReviewArcticComparison} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AffiliateReview-EspressoComparison" component={AffiliateReviewEspressoComparison} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="">
      <Composition id="-AgentDashboardControlPanelDark" component={AgentDashboardControlPanelDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-AgentDashboardControlPanelNeon" component={AgentDashboardControlPanelNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-AgentDashboardFlowDark" component={AgentDashboardFlowDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-AgentDashboardFlowNeon" component={AgentDashboardFlowNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-AgentDashboardMatrixDark" component={AgentDashboardMatrixDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-AgentDashboardMatrixNeon" component={AgentDashboardMatrixNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-AgentDashboardOceanControlPanel" component={AgentDashboardOceanControlPanel} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-AgentDashboardSunsetControlPanel" component={AgentDashboardSunsetControlPanel} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-AgentDashboardForestFlow" component={AgentDashboardForestFlow} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-AgentDashboardRoseFlow" component={AgentDashboardRoseFlow} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-AgentDashboardGoldMatrix" component={AgentDashboardGoldMatrix} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-AgentDashboardMidnightMatrix" component={AgentDashboardMidnightMatrix} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-AgentDashboardCrimsonControlPanel" component={AgentDashboardCrimsonControlPanel} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-AgentDashboardLavenderControlPanel" component={AgentDashboardLavenderControlPanel} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-AgentDashboardArcticFlow" component={AgentDashboardArcticFlow} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-AgentDashboardEspressoFlow" component={AgentDashboardEspressoFlow} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Before-After">
      <Composition id="BeforeAfter-DarkSplitScreen" component={BeforeAfterDarkSplitScreen} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BeforeAfter-WarmSplitScreen" component={BeforeAfterWarmSplitScreen} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BeforeAfter-DarkRevealWipe" component={BeforeAfterDarkRevealWipe} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BeforeAfter-WarmRevealWipe" component={BeforeAfterWarmRevealWipe} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BeforeAfter-DarkMetricsCompare" component={BeforeAfterDarkMetricsCompare} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BeforeAfter-WarmMetricsCompare" component={BeforeAfterWarmMetricsCompare} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BeforeAfter-OceanSplitScreen" component={BeforeAfterOceanSplitScreen} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BeforeAfter-SunsetSplitScreen" component={BeforeAfterSunsetSplitScreen} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BeforeAfter-ForestRevealWipe" component={BeforeAfterForestRevealWipe} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BeforeAfter-RoseRevealWipe" component={BeforeAfterRoseRevealWipe} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BeforeAfter-GoldMetricsCompare" component={BeforeAfterGoldMetricsCompare} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BeforeAfter-MidnightMetricsCompare" component={BeforeAfterMidnightMetricsCompare} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BeforeAfter-CrimsonSplitScreen" component={BeforeAfterCrimsonSplitScreen} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BeforeAfter-LavenderSplitScreen" component={BeforeAfterLavenderSplitScreen} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BeforeAfter-ArcticRevealWipe" component={BeforeAfterArcticRevealWipe} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BeforeAfter-EspressoRevealWipe" component={BeforeAfterEspressoRevealWipe} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Behind-The-Scenes">
      <Composition id="BehindTheScenes-DarkSceneCards" component={BehindTheScenesDarkSceneCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BehindTheScenes-WarmSceneCards" component={BehindTheScenesWarmSceneCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BehindTheScenes-DarkTimeline" component={BehindTheScenesDarkTimeline} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BehindTheScenes-WarmTimeline" component={BehindTheScenesWarmTimeline} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BehindTheScenes-DarkProcessFlow" component={BehindTheScenesDarkProcessFlow} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BehindTheScenes-WarmProcessFlow" component={BehindTheScenesWarmProcessFlow} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BehindTheScenes-OceanSceneCards" component={BehindTheScenesOceanSceneCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BehindTheScenes-SunsetSceneCards" component={BehindTheScenesSunsetSceneCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BehindTheScenes-ForestTimeline" component={BehindTheScenesForestTimeline} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BehindTheScenes-RoseTimeline" component={BehindTheScenesRoseTimeline} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BehindTheScenes-GoldProcessFlow" component={BehindTheScenesGoldProcessFlow} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BehindTheScenes-MidnightProcessFlow" component={BehindTheScenesMidnightProcessFlow} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BehindTheScenes-CrimsonSceneCards" component={BehindTheScenesCrimsonSceneCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BehindTheScenes-LavenderSceneCards" component={BehindTheScenesLavenderSceneCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BehindTheScenes-ArcticTimeline" component={BehindTheScenesArcticTimeline} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BehindTheScenes-EspressoTimeline" component={BehindTheScenesEspressoTimeline} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="">
      <Composition id="-BugTrackerSeverityMatrixDark" component={BugTrackerSeverityMatrixDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTrackerSeverityMatrixBold" component={BugTrackerSeverityMatrixBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTrackerTriageBoardDark" component={BugTrackerTriageBoardDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTrackerTriageBoardBold" component={BugTrackerTriageBoardBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTrackerOverviewDark" component={BugTrackerOverviewDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTrackerOverviewBold" component={BugTrackerOverviewBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTrackerOceanSeverityMatrix" component={BugTrackerOceanSeverityMatrix} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTrackerSunsetSeverityMatrix" component={BugTrackerSunsetSeverityMatrix} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTrackerForestTriageBoard" component={BugTrackerForestTriageBoard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTrackerRoseTriageBoard" component={BugTrackerRoseTriageBoard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTrackerGoldOverview" component={BugTrackerGoldOverview} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTrackerMidnightOverview" component={BugTrackerMidnightOverview} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTrackerCrimsonSeverityMatrix" component={BugTrackerCrimsonSeverityMatrix} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTrackerLavenderSeverityMatrix" component={BugTrackerLavenderSeverityMatrix} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTrackerArcticTriageBoard" component={BugTrackerArcticTriageBoard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTrackerEspressoTriageBoard" component={BugTrackerEspressoTriageBoard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="">
      <Composition id="-BugTriagePriorityColumnsDark" component={BugTriagePriorityColumnsDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTriagePriorityColumnsBold" component={BugTriagePriorityColumnsBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTriageTriageListDark" component={BugTriageTriageListDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTriageTriageListBold" component={BugTriageTriageListBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTriageSummaryDashboardDark" component={BugTriageSummaryDashboardDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTriageSummaryDashboardBold" component={BugTriageSummaryDashboardBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTriageOceanPriorityColumns" component={BugTriageOceanPriorityColumns} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTriageSunsetPriorityColumns" component={BugTriageSunsetPriorityColumns} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTriageForestTriageList" component={BugTriageForestTriageList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTriageRoseTriageList" component={BugTriageRoseTriageList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTriageGoldSummaryDashboard" component={BugTriageGoldSummaryDashboard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTriageMidnightSummaryDashboard" component={BugTriageMidnightSummaryDashboard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTriageCrimsonPriorityColumns" component={BugTriageCrimsonPriorityColumns} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTriageLavenderPriorityColumns" component={BugTriageLavenderPriorityColumns} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTriageArcticTriageList" component={BugTriageArcticTriageList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-BugTriageEspressoTriageList" component={BugTriageEspressoTriageList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="">
      <Composition id="-CaseStudyDarkNarrative" component={CaseStudyDarkNarrative} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-CaseStudyCleanComparison" component={CaseStudyCleanComparison} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-CaseStudyBoldSpotlight" component={CaseStudyBoldSpotlight} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-CaseStudyWarmNarrative" component={CaseStudyWarmNarrative} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-CaseStudyMinimalComparison" component={CaseStudyMinimalComparison} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-CaseStudyNeonSpotlight" component={CaseStudyNeonSpotlight} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-CaseStudyOceanNarrative" component={CaseStudyOceanNarrative} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-CaseStudySunsetSpotlight" component={CaseStudySunsetSpotlight} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-CaseStudyForestNarrative" component={CaseStudyForestNarrative} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-CaseStudyRoseSpotlight" component={CaseStudyRoseSpotlight} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-CaseStudyGoldNarrative" component={CaseStudyGoldNarrative} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-CaseStudyMidnightNarrative" component={CaseStudyMidnightNarrative} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-CaseStudyCrimsonSpotlight" component={CaseStudyCrimsonSpotlight} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-CaseStudyLavenderComparison" component={CaseStudyLavenderComparison} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-CaseStudyArcticComparison" component={CaseStudyArcticComparison} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-CaseStudyEspressoNarrative" component={CaseStudyEspressoNarrative} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="">
      <Composition id="-ClientPipelineFunnelDark" component={ClientPipelineFunnelDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ClientPipelineFunnelWarm" component={ClientPipelineFunnelWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ClientPipelinePipelineBoardDark" component={ClientPipelinePipelineBoardDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ClientPipelinePipelineBoardWarm" component={ClientPipelinePipelineBoardWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ClientPipelineMetricsDark" component={ClientPipelineMetricsDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ClientPipelineMetricsWarm" component={ClientPipelineMetricsWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ClientPipelineOceanFunnel" component={ClientPipelineOceanFunnel} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ClientPipelineSunsetFunnel" component={ClientPipelineSunsetFunnel} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ClientPipelineForestPipelineBoard" component={ClientPipelineForestPipelineBoard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ClientPipelineRosePipelineBoard" component={ClientPipelineRosePipelineBoard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ClientPipelineGoldMetrics" component={ClientPipelineGoldMetrics} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ClientPipelineMidnightMetrics" component={ClientPipelineMidnightMetrics} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ClientPipelineCrimsonFunnel" component={ClientPipelineCrimsonFunnel} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ClientPipelineLavenderFunnel" component={ClientPipelineLavenderFunnel} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ClientPipelineArcticPipelineBoard" component={ClientPipelineArcticPipelineBoard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ClientPipelineEspressoPipelineBoard" component={ClientPipelineEspressoPipelineBoard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Collaboration">
      <Composition id="Collaboration-DarkSplitScreen" component={CollaborationDarkSplitScreen} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Collaboration-BoldSplitScreen" component={CollaborationBoldSplitScreen} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Collaboration-DarkAnnouncement" component={CollaborationDarkAnnouncement} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Collaboration-BoldAnnouncement" component={CollaborationBoldAnnouncement} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Collaboration-DarkStatsMerge" component={CollaborationDarkStatsMerge} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Collaboration-BoldStatsMerge" component={CollaborationBoldStatsMerge} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Collaboration-OceanSplitScreen" component={CollaborationOceanSplitScreen} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Collaboration-SunsetSplitScreen" component={CollaborationSunsetSplitScreen} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Collaboration-ForestAnnouncement" component={CollaborationForestAnnouncement} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Collaboration-RoseAnnouncement" component={CollaborationRoseAnnouncement} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Collaboration-GoldStatsMerge" component={CollaborationGoldStatsMerge} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Collaboration-MidnightStatsMerge" component={CollaborationMidnightStatsMerge} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Collaboration-CrimsonSplitScreen" component={CollaborationCrimsonSplitScreen} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Collaboration-LavenderSplitScreen" component={CollaborationLavenderSplitScreen} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Collaboration-ArcticAnnouncement" component={CollaborationArcticAnnouncement} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Collaboration-EspressoAnnouncement" component={CollaborationEspressoAnnouncement} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="">
      <Composition id="-ComponentInventoryArchitectureGridDark" component={ComponentInventoryArchitectureGridDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ComponentInventoryArchitectureGridClean" component={ComponentInventoryArchitectureGridClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ComponentInventoryDependencyMapDark" component={ComponentInventoryDependencyMapDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ComponentInventoryDependencyMapClean" component={ComponentInventoryDependencyMapClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ComponentInventoryInventoryListDark" component={ComponentInventoryInventoryListDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ComponentInventoryInventoryListClean" component={ComponentInventoryInventoryListClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ComponentInventoryOceanArchitectureGrid" component={ComponentInventoryOceanArchitectureGrid} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ComponentInventorySunsetArchitectureGrid" component={ComponentInventorySunsetArchitectureGrid} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ComponentInventoryForestDependencyMap" component={ComponentInventoryForestDependencyMap} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ComponentInventoryRoseDependencyMap" component={ComponentInventoryRoseDependencyMap} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ComponentInventoryGoldInventoryList" component={ComponentInventoryGoldInventoryList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ComponentInventoryMidnightInventoryList" component={ComponentInventoryMidnightInventoryList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ComponentInventoryCrimsonArchitectureGrid" component={ComponentInventoryCrimsonArchitectureGrid} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ComponentInventoryLavenderArchitectureGrid" component={ComponentInventoryLavenderArchitectureGrid} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ComponentInventoryArcticDependencyMap" component={ComponentInventoryArcticDependencyMap} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ComponentInventoryEspressoDependencyMap" component={ComponentInventoryEspressoDependencyMap} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Concept-Pitch">
      <Composition id="ConceptPitch-ArcDark" component={ConceptPitchArcDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ConceptPitch-ArcBold" component={ConceptPitchArcBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ConceptPitch-BoardDark" component={ConceptPitchBoardDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ConceptPitch-BoardBold" component={ConceptPitchBoardBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ConceptPitch-BriefDark" component={ConceptPitchBriefDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ConceptPitch-BriefBold" component={ConceptPitchBriefBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ConceptPitch-OceanArc" component={ConceptPitchOceanArc} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ConceptPitch-SunsetBoard" component={ConceptPitchSunsetBoard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ConceptPitch-ForestBrief" component={ConceptPitchForestBrief} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ConceptPitch-RoseArc" component={ConceptPitchRoseArc} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ConceptPitch-GoldBoard" component={ConceptPitchGoldBoard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ConceptPitch-MidnightBrief" component={ConceptPitchMidnightBrief} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ConceptPitch-CrimsonArc" component={ConceptPitchCrimsonArc} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ConceptPitch-LavenderBoard" component={ConceptPitchLavenderBoard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ConceptPitch-ArcticBrief" component={ConceptPitchArcticBrief} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ConceptPitch-EspressoArc" component={ConceptPitchEspressoArc} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Countdown-Hype">
      <Composition id="CountdownHype-DarkTimer" component={CountdownHypeDarkTimer} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CountdownHype-NeonTimer" component={CountdownHypeNeonTimer} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CountdownHype-DarkTeaser" component={CountdownHypeDarkTeaser} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CountdownHype-NeonTeaser" component={CountdownHypeNeonTeaser} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CountdownHype-DarkUrgency" component={CountdownHypeDarkUrgency} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CountdownHype-NeonUrgency" component={CountdownHypeNeonUrgency} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CountdownHype-OceanTimer" component={CountdownHypeOceanTimer} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CountdownHype-SunsetTimer" component={CountdownHypeSunsetTimer} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CountdownHype-ForestTeaser" component={CountdownHypeForestTeaser} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CountdownHype-RoseTeaser" component={CountdownHypeRoseTeaser} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CountdownHype-GoldUrgency" component={CountdownHypeGoldUrgency} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CountdownHype-MidnightUrgency" component={CountdownHypeMidnightUrgency} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CountdownHype-CrimsonTimer" component={CountdownHypeCrimsonTimer} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CountdownHype-LavenderTimer" component={CountdownHypeLavenderTimer} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CountdownHype-ArcticTeaser" component={CountdownHypeArcticTeaser} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CountdownHype-EspressoTeaser" component={CountdownHypeEspressoTeaser} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Course-Promo">
      <Composition id="CoursePromo-DarkOverview" component={CoursePromoDarkOverview} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CoursePromo-CleanOverview" component={CoursePromoCleanOverview} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CoursePromo-DarkCurriculum" component={CoursePromoDarkCurriculum} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CoursePromo-CleanCurriculum" component={CoursePromoCleanCurriculum} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CoursePromo-DarkInstructor" component={CoursePromoDarkInstructor} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CoursePromo-CleanInstructor" component={CoursePromoCleanInstructor} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CoursePromo-OceanOverview" component={CoursePromoOceanOverview} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CoursePromo-SunsetOverview" component={CoursePromoSunsetOverview} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CoursePromo-ForestCurriculum" component={CoursePromoForestCurriculum} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CoursePromo-RoseCurriculum" component={CoursePromoRoseCurriculum} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CoursePromo-GoldInstructor" component={CoursePromoGoldInstructor} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CoursePromo-MidnightInstructor" component={CoursePromoMidnightInstructor} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CoursePromo-CrimsonOverview" component={CoursePromoCrimsonOverview} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CoursePromo-LavenderOverview" component={CoursePromoLavenderOverview} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CoursePromo-ArcticCurriculum" component={CoursePromoArcticCurriculum} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CoursePromo-EspressoCurriculum" component={CoursePromoEspressoCurriculum} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="">
      <Composition id="-DeploymentStatusEnvironmentCardsDark" component={DeploymentStatusEnvironmentCardsDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-DeploymentStatusEnvironmentCardsNeon" component={DeploymentStatusEnvironmentCardsNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-DeploymentStatusPipelineViewDark" component={DeploymentStatusPipelineViewDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-DeploymentStatusPipelineViewNeon" component={DeploymentStatusPipelineViewNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-DeploymentStatusHealthDashboardDark" component={DeploymentStatusHealthDashboardDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-DeploymentStatusHealthDashboardNeon" component={DeploymentStatusHealthDashboardNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-DeploymentStatusOceanEnvironmentCards" component={DeploymentStatusOceanEnvironmentCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-DeploymentStatusSunsetEnvironmentCards" component={DeploymentStatusSunsetEnvironmentCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-DeploymentStatusForestPipelineView" component={DeploymentStatusForestPipelineView} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-DeploymentStatusRosePipelineView" component={DeploymentStatusRosePipelineView} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-DeploymentStatusGoldHealthDashboard" component={DeploymentStatusGoldHealthDashboard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-DeploymentStatusMidnightHealthDashboard" component={DeploymentStatusMidnightHealthDashboard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-DeploymentStatusCrimsonEnvironmentCards" component={DeploymentStatusCrimsonEnvironmentCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-DeploymentStatusLavenderEnvironmentCards" component={DeploymentStatusLavenderEnvironmentCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-DeploymentStatusArcticPipelineView" component={DeploymentStatusArcticPipelineView} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-DeploymentStatusEspressoPipelineView" component={DeploymentStatusEspressoPipelineView} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="">
      <Composition id="-EffortTrackingTeamAllocationDark" component={EffortTrackingTeamAllocationDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EffortTrackingTeamAllocationWarm" component={EffortTrackingTeamAllocationWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EffortTrackingCapacityDark" component={EffortTrackingCapacityDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EffortTrackingCapacityWarm" component={EffortTrackingCapacityWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EffortTrackingBreakdownDark" component={EffortTrackingBreakdownDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EffortTrackingBreakdownWarm" component={EffortTrackingBreakdownWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EffortTrackingOceanTeamAllocation" component={EffortTrackingOceanTeamAllocation} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EffortTrackingSunsetTeamAllocation" component={EffortTrackingSunsetTeamAllocation} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EffortTrackingForestCapacity" component={EffortTrackingForestCapacity} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EffortTrackingRoseCapacity" component={EffortTrackingRoseCapacity} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EffortTrackingGoldBreakdown" component={EffortTrackingGoldBreakdown} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EffortTrackingMidnightBreakdown" component={EffortTrackingMidnightBreakdown} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EffortTrackingCrimsonTeamAllocation" component={EffortTrackingCrimsonTeamAllocation} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EffortTrackingLavenderTeamAllocation" component={EffortTrackingLavenderTeamAllocation} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EffortTrackingArcticCapacity" component={EffortTrackingArcticCapacity} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EffortTrackingEspressoCapacity" component={EffortTrackingEspressoCapacity} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Event">
      <Composition id="Event-DarkHero" component={EventDarkHero} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Event-CleanSpeakers" component={EventCleanSpeakers} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Event-BoldCountdown" component={EventBoldCountdown} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Event-WarmHero" component={EventWarmHero} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Event-MinimalSpeakers" component={EventMinimalSpeakers} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Event-NeonCountdown" component={EventNeonCountdown} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Event-OceanHero" component={EventOceanHero} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Event-SunsetSpeakers" component={EventSunsetSpeakers} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Event-ForestCountdown" component={EventForestCountdown} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Event-RoseHero" component={EventRoseHero} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Event-GoldSpeakers" component={EventGoldSpeakers} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Event-MidnightCountdown" component={EventMidnightCountdown} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Event-CrimsonHero" component={EventCrimsonHero} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Event-LavenderSpeakers" component={EventLavenderSpeakers} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Event-ArcticCountdown" component={EventArcticCountdown} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Event-EspressoHero" component={EventEspressoHero} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="">
      <Composition id="-EventVenueScheduleMapDark" component={EventVenueScheduleMapDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EventVenueScheduleMapBold" component={EventVenueScheduleMapBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EventVenueVenueCardsDark" component={EventVenueVenueCardsDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EventVenueVenueCardsBold" component={EventVenueVenueCardsBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EventVenueEventOverviewDark" component={EventVenueEventOverviewDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EventVenueEventOverviewBold" component={EventVenueEventOverviewBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EventVenueOceanScheduleMap" component={EventVenueOceanScheduleMap} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EventVenueSunsetScheduleMap" component={EventVenueSunsetScheduleMap} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EventVenueForestVenueCards" component={EventVenueForestVenueCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EventVenueRoseVenueCards" component={EventVenueRoseVenueCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EventVenueGoldEventOverview" component={EventVenueGoldEventOverview} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EventVenueMidnightEventOverview" component={EventVenueMidnightEventOverview} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EventVenueCrimsonScheduleMap" component={EventVenueCrimsonScheduleMap} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EventVenueLavenderScheduleMap" component={EventVenueLavenderScheduleMap} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EventVenueArcticVenueCards" component={EventVenueArcticVenueCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-EventVenueEspressoVenueCards" component={EventVenueEspressoVenueCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Explainer">
      <Composition id="Explainer-DarkCinematic" component={ExplainerDarkCinematic} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Explainer-CleanWhiteboard" component={ExplainerCleanWhiteboard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Explainer-BoldProcess" component={ExplainerBoldProcess} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Explainer-WarmWhiteboard" component={ExplainerWarmWhiteboard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Explainer-MinimalProcess" component={ExplainerMinimalProcess} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Explainer-NeonCinematic" component={ExplainerNeonCinematic} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Explainer-OceanCinematic" component={ExplainerOceanCinematic} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Explainer-SunsetProcess" component={ExplainerSunsetProcess} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Explainer-ForestProcess" component={ExplainerForestProcess} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Explainer-RoseProcess" component={ExplainerRoseProcess} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Explainer-GoldCinematic" component={ExplainerGoldCinematic} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Explainer-MidnightWhiteboard" component={ExplainerMidnightWhiteboard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Explainer-CrimsonProcess" component={ExplainerCrimsonProcess} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Explainer-LavenderWhiteboard" component={ExplainerLavenderWhiteboard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Explainer-ArcticWhiteboard" component={ExplainerArcticWhiteboard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Explainer-EspressoProcess" component={ExplainerEspressoProcess} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="">
      <Composition id="-FAQDarkAccordion" component={FAQDarkAccordion} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FAQCleanCards" component={FAQCleanCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FAQBoldInterview" component={FAQBoldInterview} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FAQWarmAccordion" component={FAQWarmAccordion} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FAQMinimalCards" component={FAQMinimalCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FAQNeonInterview" component={FAQNeonInterview} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FAQOceanAccordion" component={FAQOceanAccordion} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FAQSunsetCards" component={FAQSunsetCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FAQForestAccordion" component={FAQForestAccordion} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FAQRoseCards" component={FAQRoseCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FAQGoldAccordion" component={FAQGoldAccordion} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FAQMidnightCards" component={FAQMidnightCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FAQCrimsonAccordion" component={FAQCrimsonAccordion} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FAQLavenderCards" component={FAQLavenderCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FAQArcticAccordion" component={FAQArcticAccordion} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FAQEspressoCards" component={FAQEspressoCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="">
      <Composition id="-FeatureFlagsExperimentBoardDark" component={FeatureFlagsExperimentBoardDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureFlagsExperimentBoardNeon" component={FeatureFlagsExperimentBoardNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureFlagsResultsViewDark" component={FeatureFlagsResultsViewDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureFlagsResultsViewNeon" component={FeatureFlagsResultsViewNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureFlagsRolloutTrackerDark" component={FeatureFlagsRolloutTrackerDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureFlagsRolloutTrackerNeon" component={FeatureFlagsRolloutTrackerNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureFlagsOceanExperimentBoard" component={FeatureFlagsOceanExperimentBoard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureFlagsSunsetExperimentBoard" component={FeatureFlagsSunsetExperimentBoard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureFlagsForestResultsView" component={FeatureFlagsForestResultsView} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureFlagsRoseResultsView" component={FeatureFlagsRoseResultsView} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureFlagsGoldRolloutTracker" component={FeatureFlagsGoldRolloutTracker} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureFlagsMidnightRolloutTracker" component={FeatureFlagsMidnightRolloutTracker} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureFlagsCrimsonExperimentBoard" component={FeatureFlagsCrimsonExperimentBoard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureFlagsLavenderExperimentBoard" component={FeatureFlagsLavenderExperimentBoard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureFlagsArcticResultsView" component={FeatureFlagsArcticResultsView} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureFlagsEspressoResultsView" component={FeatureFlagsEspressoResultsView} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="">
      <Composition id="-FeatureRoadmapTimelineDark" component={FeatureRoadmapTimelineDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureRoadmapTimelineClean" component={FeatureRoadmapTimelineClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureRoadmapSwimlaneDark" component={FeatureRoadmapSwimlaneDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureRoadmapSwimlaneClean" component={FeatureRoadmapSwimlaneClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureRoadmapGridDark" component={FeatureRoadmapGridDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureRoadmapGridClean" component={FeatureRoadmapGridClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureRoadmapOceanTimeline" component={FeatureRoadmapOceanTimeline} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureRoadmapSunsetTimeline" component={FeatureRoadmapSunsetTimeline} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureRoadmapForestSwimlane" component={FeatureRoadmapForestSwimlane} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureRoadmapRoseSwimlane" component={FeatureRoadmapRoseSwimlane} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureRoadmapGoldGrid" component={FeatureRoadmapGoldGrid} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureRoadmapMidnightGrid" component={FeatureRoadmapMidnightGrid} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureRoadmapCrimsonTimeline" component={FeatureRoadmapCrimsonTimeline} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureRoadmapLavenderTimeline" component={FeatureRoadmapLavenderTimeline} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureRoadmapArcticSwimlane" component={FeatureRoadmapArcticSwimlane} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-FeatureRoadmapEspressoSwimlane" component={FeatureRoadmapEspressoSwimlane} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Fitness-Routine">
      <Composition id="FitnessRoutine-BoldExerciseList" component={FitnessRoutineBoldExerciseList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FitnessRoutine-NeonExerciseList" component={FitnessRoutineNeonExerciseList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FitnessRoutine-BoldTimerFocus" component={FitnessRoutineBoldTimerFocus} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FitnessRoutine-NeonTimerFocus" component={FitnessRoutineNeonTimerFocus} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FitnessRoutine-BoldCircuit" component={FitnessRoutineBoldCircuit} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FitnessRoutine-NeonCircuit" component={FitnessRoutineNeonCircuit} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FitnessRoutine-OceanExerciseList" component={FitnessRoutineOceanExerciseList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FitnessRoutine-SunsetExerciseList" component={FitnessRoutineSunsetExerciseList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FitnessRoutine-ForestTimerFocus" component={FitnessRoutineForestTimerFocus} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FitnessRoutine-RoseTimerFocus" component={FitnessRoutineRoseTimerFocus} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FitnessRoutine-GoldCircuit" component={FitnessRoutineGoldCircuit} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FitnessRoutine-MidnightCircuit" component={FitnessRoutineMidnightCircuit} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FitnessRoutine-CrimsonExerciseList" component={FitnessRoutineCrimsonExerciseList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FitnessRoutine-LavenderExerciseList" component={FitnessRoutineLavenderExerciseList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FitnessRoutine-ArcticTimerFocus" component={FitnessRoutineArcticTimerFocus} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FitnessRoutine-EspressoTimerFocus" component={FitnessRoutineEspressoTimerFocus} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="">
      <Composition id="-IntegrationStatusStatusWallDark" component={IntegrationStatusStatusWallDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-IntegrationStatusStatusWallClean" component={IntegrationStatusStatusWallClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-IntegrationStatusCategoryGroupsDark" component={IntegrationStatusCategoryGroupsDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-IntegrationStatusCategoryGroupsClean" component={IntegrationStatusCategoryGroupsClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-IntegrationStatusHealthMonitorDark" component={IntegrationStatusHealthMonitorDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-IntegrationStatusHealthMonitorClean" component={IntegrationStatusHealthMonitorClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-IntegrationStatusOceanStatusWall" component={IntegrationStatusOceanStatusWall} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-IntegrationStatusSunsetStatusWall" component={IntegrationStatusSunsetStatusWall} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-IntegrationStatusForestCategoryGroups" component={IntegrationStatusForestCategoryGroups} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-IntegrationStatusRoseCategoryGroups" component={IntegrationStatusRoseCategoryGroups} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-IntegrationStatusGoldHealthMonitor" component={IntegrationStatusGoldHealthMonitor} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-IntegrationStatusMidnightHealthMonitor" component={IntegrationStatusMidnightHealthMonitor} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-IntegrationStatusCrimsonStatusWall" component={IntegrationStatusCrimsonStatusWall} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-IntegrationStatusLavenderStatusWall" component={IntegrationStatusLavenderStatusWall} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-IntegrationStatusArcticCategoryGroups" component={IntegrationStatusArcticCategoryGroups} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-IntegrationStatusEspressoCategoryGroups" component={IntegrationStatusEspressoCategoryGroups} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Invoice">
      <Composition id="Invoice-DarkProfessional" component={InvoiceDarkProfessional} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Invoice-CleanProfessional" component={InvoiceCleanProfessional} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Invoice-BoldUrgent" component={InvoiceBoldUrgent} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Invoice-WarmFriendly" component={InvoiceWarmFriendly} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Invoice-MinimalProfessional" component={InvoiceMinimalProfessional} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Invoice-NeonUrgent" component={InvoiceNeonUrgent} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Invoice-OceanProfessional" component={InvoiceOceanProfessional} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Invoice-SunsetFriendly" component={InvoiceSunsetFriendly} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Invoice-ForestProfessional" component={InvoiceForestProfessional} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Invoice-RoseFriendly" component={InvoiceRoseFriendly} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Invoice-GoldProfessional" component={InvoiceGoldProfessional} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Invoice-MidnightProfessional" component={InvoiceMidnightProfessional} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Invoice-CrimsonUrgent" component={InvoiceCrimsonUrgent} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Invoice-LavenderFriendly" component={InvoiceLavenderFriendly} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Invoice-ArcticProfessional" component={InvoiceArcticProfessional} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Invoice-EspressoFriendly" component={InvoiceEspressoFriendly} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Listing">
      <Composition id="Listing-CleanShowcase" component={ListingCleanShowcase} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Listing-MinimalShowcase" component={ListingMinimalShowcase} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Listing-CleanFeatureGrid" component={ListingCleanFeatureGrid} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Listing-MinimalFeatureGrid" component={ListingMinimalFeatureGrid} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Listing-CleanComparison" component={ListingCleanComparison} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Listing-MinimalComparison" component={ListingMinimalComparison} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Listing-OceanShowcase" component={ListingOceanShowcase} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Listing-SunsetShowcase" component={ListingSunsetShowcase} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Listing-ForestFeatureGrid" component={ListingForestFeatureGrid} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Listing-RoseFeatureGrid" component={ListingRoseFeatureGrid} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Listing-GoldComparison" component={ListingGoldComparison} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Listing-MidnightComparison" component={ListingMidnightComparison} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Listing-CrimsonShowcase" component={ListingCrimsonShowcase} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Listing-LavenderShowcase" component={ListingLavenderShowcase} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Listing-ArcticFeatureGrid" component={ListingArcticFeatureGrid} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Listing-EspressoFeatureGrid" component={ListingEspressoFeatureGrid} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Milestone">
      <Composition id="Milestone-DarkCelebration" component={MilestoneDarkCelebration} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Milestone-CleanJourney" component={MilestoneCleanJourney} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Milestone-BoldCelebration" component={MilestoneBoldCelebration} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Milestone-WarmGratitude" component={MilestoneWarmGratitude} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Milestone-MinimalJourney" component={MilestoneMinimalJourney} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Milestone-NeonCelebration" component={MilestoneNeonCelebration} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Milestone-OceanJourney" component={MilestoneOceanJourney} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Milestone-SunsetCelebration" component={MilestoneSunsetCelebration} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Milestone-ForestJourney" component={MilestoneForestJourney} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Milestone-RoseCelebration" component={MilestoneRoseCelebration} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Milestone-GoldGratitude" component={MilestoneGoldGratitude} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Milestone-MidnightJourney" component={MilestoneMidnightJourney} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Milestone-CrimsonCelebration" component={MilestoneCrimsonCelebration} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Milestone-LavenderJourney" component={MilestoneLavenderJourney} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Milestone-ArcticJourney" component={MilestoneArcticJourney} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Milestone-EspressoGratitude" component={MilestoneEspressoGratitude} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Music-Visualizer">
      <Composition id="MusicVisualizer-DarkBars" component={MusicVisualizerDarkBars} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MusicVisualizer-NeonBars" component={MusicVisualizerNeonBars} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MusicVisualizer-DarkRadial" component={MusicVisualizerDarkRadial} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MusicVisualizer-NeonRadial" component={MusicVisualizerNeonRadial} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MusicVisualizer-DarkLyrics" component={MusicVisualizerDarkLyrics} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MusicVisualizer-NeonLyrics" component={MusicVisualizerNeonLyrics} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MusicVisualizer-OceanBars" component={MusicVisualizerOceanBars} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MusicVisualizer-SunsetBars" component={MusicVisualizerSunsetBars} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MusicVisualizer-ForestRadial" component={MusicVisualizerForestRadial} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MusicVisualizer-RoseRadial" component={MusicVisualizerRoseRadial} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MusicVisualizer-GoldLyrics" component={MusicVisualizerGoldLyrics} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MusicVisualizer-MidnightLyrics" component={MusicVisualizerMidnightLyrics} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MusicVisualizer-CrimsonBars" component={MusicVisualizerCrimsonBars} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MusicVisualizer-LavenderBars" component={MusicVisualizerLavenderBars} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MusicVisualizer-ArcticRadial" component={MusicVisualizerArcticRadial} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MusicVisualizer-EspressoRadial" component={MusicVisualizerEspressoRadial} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="">
      <Composition id="-NeighborhoodGuideExplorerWarm" component={NeighborhoodGuideExplorerWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-NeighborhoodGuideExplorerNeon" component={NeighborhoodGuideExplorerNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-NeighborhoodGuideHighlightsReelWarm" component={NeighborhoodGuideHighlightsReelWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-NeighborhoodGuideHighlightsReelNeon" component={NeighborhoodGuideHighlightsReelNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-NeighborhoodGuideOverviewWarm" component={NeighborhoodGuideOverviewWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-NeighborhoodGuideOverviewNeon" component={NeighborhoodGuideOverviewNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-NeighborhoodGuideOceanExplorer" component={NeighborhoodGuideOceanExplorer} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-NeighborhoodGuideSunsetExplorer" component={NeighborhoodGuideSunsetExplorer} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-NeighborhoodGuideForestHighlightsReel" component={NeighborhoodGuideForestHighlightsReel} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-NeighborhoodGuideRoseHighlightsReel" component={NeighborhoodGuideRoseHighlightsReel} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-NeighborhoodGuideGoldOverview" component={NeighborhoodGuideGoldOverview} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-NeighborhoodGuideMidnightOverview" component={NeighborhoodGuideMidnightOverview} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-NeighborhoodGuideCrimsonExplorer" component={NeighborhoodGuideCrimsonExplorer} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-NeighborhoodGuideLavenderExplorer" component={NeighborhoodGuideLavenderExplorer} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-NeighborhoodGuideArcticHighlightsReel" component={NeighborhoodGuideArcticHighlightsReel} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-NeighborhoodGuideEspressoHighlightsReel" component={NeighborhoodGuideEspressoHighlightsReel} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Newsletter-Promo">
      <Composition id="NewsletterPromo-DarkSubscribeCta" component={NewsletterPromoDarkSubscribeCta} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="NewsletterPromo-CleanSubscribeCta" component={NewsletterPromoCleanSubscribeCta} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="NewsletterPromo-DarkIssuePreview" component={NewsletterPromoDarkIssuePreview} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="NewsletterPromo-CleanIssuePreview" component={NewsletterPromoCleanIssuePreview} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="NewsletterPromo-DarkTestimonialBlend" component={NewsletterPromoDarkTestimonialBlend} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="NewsletterPromo-CleanTestimonialBlend" component={NewsletterPromoCleanTestimonialBlend} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="NewsletterPromo-OceanSubscribeCta" component={NewsletterPromoOceanSubscribeCta} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="NewsletterPromo-SunsetSubscribeCta" component={NewsletterPromoSunsetSubscribeCta} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="NewsletterPromo-ForestIssuePreview" component={NewsletterPromoForestIssuePreview} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="NewsletterPromo-RoseIssuePreview" component={NewsletterPromoRoseIssuePreview} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="NewsletterPromo-GoldTestimonialBlend" component={NewsletterPromoGoldTestimonialBlend} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="NewsletterPromo-MidnightTestimonialBlend" component={NewsletterPromoMidnightTestimonialBlend} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="NewsletterPromo-CrimsonSubscribeCta" component={NewsletterPromoCrimsonSubscribeCta} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="NewsletterPromo-LavenderSubscribeCta" component={NewsletterPromoLavenderSubscribeCta} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="NewsletterPromo-ArcticIssuePreview" component={NewsletterPromoArcticIssuePreview} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="NewsletterPromo-EspressoIssuePreview" component={NewsletterPromoEspressoIssuePreview} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="">
      <Composition id="-OfficeDirectoryWorldViewDark" component={OfficeDirectoryWorldViewDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-OfficeDirectoryWorldViewClean" component={OfficeDirectoryWorldViewClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-OfficeDirectoryCardListDark" component={OfficeDirectoryCardListDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-OfficeDirectoryCardListClean" component={OfficeDirectoryCardListClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-OfficeDirectoryRegionGroupsDark" component={OfficeDirectoryRegionGroupsDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-OfficeDirectoryRegionGroupsClean" component={OfficeDirectoryRegionGroupsClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-OfficeDirectoryOceanWorldView" component={OfficeDirectoryOceanWorldView} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-OfficeDirectorySunsetWorldView" component={OfficeDirectorySunsetWorldView} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-OfficeDirectoryForestCardList" component={OfficeDirectoryForestCardList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-OfficeDirectoryRoseCardList" component={OfficeDirectoryRoseCardList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-OfficeDirectoryGoldRegionGroups" component={OfficeDirectoryGoldRegionGroups} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-OfficeDirectoryMidnightRegionGroups" component={OfficeDirectoryMidnightRegionGroups} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-OfficeDirectoryCrimsonWorldView" component={OfficeDirectoryCrimsonWorldView} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-OfficeDirectoryLavenderWorldView" component={OfficeDirectoryLavenderWorldView} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-OfficeDirectoryArcticCardList" component={OfficeDirectoryArcticCardList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-OfficeDirectoryEspressoCardList" component={OfficeDirectoryEspressoCardList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Onboarding">
      <Composition id="Onboarding-DarkProfessional" component={OnboardingDarkProfessional} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Onboarding-CleanProfessional" component={OnboardingCleanProfessional} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Onboarding-BoldCreative" component={OnboardingBoldCreative} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Onboarding-WarmFriendly" component={OnboardingWarmFriendly} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Onboarding-MinimalProfessional" component={OnboardingMinimalProfessional} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Onboarding-NeonCreative" component={OnboardingNeonCreative} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Onboarding-OceanProfessional" component={OnboardingOceanProfessional} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Onboarding-SunsetCreative" component={OnboardingSunsetCreative} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Onboarding-ForestProfessional" component={OnboardingForestProfessional} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Onboarding-RoseCreative" component={OnboardingRoseCreative} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Onboarding-GoldProfessional" component={OnboardingGoldProfessional} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Onboarding-MidnightProfessional" component={OnboardingMidnightProfessional} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Onboarding-CrimsonCreative" component={OnboardingCrimsonCreative} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Onboarding-LavenderFriendly" component={OnboardingLavenderFriendly} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Onboarding-ArcticProfessional" component={OnboardingArcticProfessional} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Onboarding-EspressoFriendly" component={OnboardingEspressoFriendly} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="">
      <Composition id="-PinCollectionCardGalleryWarm" component={PinCollectionCardGalleryWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PinCollectionCardGalleryClean" component={PinCollectionCardGalleryClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PinCollectionMapListWarm" component={PinCollectionMapListWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PinCollectionMapListClean" component={PinCollectionMapListClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PinCollectionCategoryGridWarm" component={PinCollectionCategoryGridWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PinCollectionCategoryGridClean" component={PinCollectionCategoryGridClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PinCollectionOceanCardGallery" component={PinCollectionOceanCardGallery} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PinCollectionSunsetMapList" component={PinCollectionSunsetMapList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PinCollectionForestCardGallery" component={PinCollectionForestCardGallery} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PinCollectionRoseCategoryGrid" component={PinCollectionRoseCategoryGrid} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PinCollectionGoldMapList" component={PinCollectionGoldMapList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PinCollectionMidnightCardGallery" component={PinCollectionMidnightCardGallery} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PinCollectionCrimsonCategoryGrid" component={PinCollectionCrimsonCategoryGrid} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PinCollectionLavenderMapList" component={PinCollectionLavenderMapList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PinCollectionArcticCardGallery" component={PinCollectionArcticCardGallery} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PinCollectionEspressoCategoryGrid" component={PinCollectionEspressoCategoryGrid} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="">
      <Composition id="-PlatformOverviewCommandCenterDark" component={PlatformOverviewCommandCenterDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PlatformOverviewCommandCenterNeon" component={PlatformOverviewCommandCenterNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PlatformOverviewModuleGridDark" component={PlatformOverviewModuleGridDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PlatformOverviewModuleGridNeon" component={PlatformOverviewModuleGridNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PlatformOverviewStackDark" component={PlatformOverviewStackDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PlatformOverviewStackNeon" component={PlatformOverviewStackNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PlatformOverviewOceanCommandCenter" component={PlatformOverviewOceanCommandCenter} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PlatformOverviewSunsetCommandCenter" component={PlatformOverviewSunsetCommandCenter} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PlatformOverviewForestModuleGrid" component={PlatformOverviewForestModuleGrid} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PlatformOverviewRoseModuleGrid" component={PlatformOverviewRoseModuleGrid} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PlatformOverviewGoldStack" component={PlatformOverviewGoldStack} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PlatformOverviewMidnightStack" component={PlatformOverviewMidnightStack} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PlatformOverviewCrimsonCommandCenter" component={PlatformOverviewCrimsonCommandCenter} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PlatformOverviewLavenderCommandCenter" component={PlatformOverviewLavenderCommandCenter} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PlatformOverviewArcticModuleGrid" component={PlatformOverviewArcticModuleGrid} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PlatformOverviewEspressoModuleGrid" component={PlatformOverviewEspressoModuleGrid} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Podcast-Audiogram">
      <Composition id="PodcastAudiogram-DarkWaveform" component={PodcastAudiogramDarkWaveform} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PodcastAudiogram-WarmWaveform" component={PodcastAudiogramWarmWaveform} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PodcastAudiogram-DarkQuoteCard" component={PodcastAudiogramDarkQuoteCard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PodcastAudiogram-WarmQuoteCard" component={PodcastAudiogramWarmQuoteCard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PodcastAudiogram-DarkEpisodePromo" component={PodcastAudiogramDarkEpisodePromo} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PodcastAudiogram-WarmEpisodePromo" component={PodcastAudiogramWarmEpisodePromo} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PodcastAudiogram-OceanWaveform" component={PodcastAudiogramOceanWaveform} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PodcastAudiogram-SunsetWaveform" component={PodcastAudiogramSunsetWaveform} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PodcastAudiogram-ForestQuoteCard" component={PodcastAudiogramForestQuoteCard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PodcastAudiogram-RoseQuoteCard" component={PodcastAudiogramRoseQuoteCard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PodcastAudiogram-GoldEpisodePromo" component={PodcastAudiogramGoldEpisodePromo} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PodcastAudiogram-MidnightEpisodePromo" component={PodcastAudiogramMidnightEpisodePromo} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PodcastAudiogram-CrimsonWaveform" component={PodcastAudiogramCrimsonWaveform} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PodcastAudiogram-LavenderWaveform" component={PodcastAudiogramLavenderWaveform} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PodcastAudiogram-ArcticQuoteCard" component={PodcastAudiogramArcticQuoteCard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PodcastAudiogram-EspressoQuoteCard" component={PodcastAudiogramEspressoQuoteCard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Poll-Quiz">
      <Composition id="PollQuiz-DarkQuestionCard" component={PollQuizDarkQuestionCard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PollQuiz-NeonQuestionCard" component={PollQuizNeonQuestionCard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PollQuiz-DarkResultsBar" component={PollQuizDarkResultsBar} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PollQuiz-NeonResultsBar" component={PollQuizNeonResultsBar} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PollQuiz-DarkReveal" component={PollQuizDarkReveal} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PollQuiz-NeonReveal" component={PollQuizNeonReveal} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PollQuiz-OceanQuestionCard" component={PollQuizOceanQuestionCard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PollQuiz-SunsetQuestionCard" component={PollQuizSunsetQuestionCard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PollQuiz-ForestResultsBar" component={PollQuizForestResultsBar} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PollQuiz-RoseResultsBar" component={PollQuizRoseResultsBar} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PollQuiz-GoldReveal" component={PollQuizGoldReveal} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PollQuiz-MidnightReveal" component={PollQuizMidnightReveal} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PollQuiz-CrimsonQuestionCard" component={PollQuizCrimsonQuestionCard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PollQuiz-LavenderQuestionCard" component={PollQuizLavenderQuestionCard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PollQuiz-ArcticResultsBar" component={PollQuizArcticResultsBar} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PollQuiz-EspressoResultsBar" component={PollQuizEspressoResultsBar} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Portfolio">
      <Composition id="Portfolio-DarkGallery" component={PortfolioDarkGallery} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Portfolio-CleanCaseStudy" component={PortfolioCleanCaseStudy} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Portfolio-BoldReel" component={PortfolioBoldReel} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Portfolio-WarmGallery" component={PortfolioWarmGallery} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Portfolio-MinimalCaseStudy" component={PortfolioMinimalCaseStudy} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Portfolio-NeonReel" component={PortfolioNeonReel} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Portfolio-OceanCaseStudy" component={PortfolioOceanCaseStudy} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Portfolio-SunsetGallery" component={PortfolioSunsetGallery} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Portfolio-ForestCaseStudy" component={PortfolioForestCaseStudy} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Portfolio-RoseGallery" component={PortfolioRoseGallery} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Portfolio-GoldCaseStudy" component={PortfolioGoldCaseStudy} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Portfolio-MidnightCaseStudy" component={PortfolioMidnightCaseStudy} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Portfolio-CrimsonReel" component={PortfolioCrimsonReel} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Portfolio-LavenderGallery" component={PortfolioLavenderGallery} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Portfolio-ArcticCaseStudy" component={PortfolioArcticCaseStudy} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Portfolio-EspressoGallery" component={PortfolioEspressoGallery} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="">
      <Composition id="-PricingDarkTiers" component={PricingDarkTiers} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PricingCleanComparison" component={PricingCleanComparison} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PricingBoldSpotlight" component={PricingBoldSpotlight} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PricingWarmTiers" component={PricingWarmTiers} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PricingMinimalComparison" component={PricingMinimalComparison} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PricingNeonSpotlight" component={PricingNeonSpotlight} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PricingOceanTiers" component={PricingOceanTiers} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PricingSunsetComparison" component={PricingSunsetComparison} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PricingForestTiers" component={PricingForestTiers} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PricingRoseComparison" component={PricingRoseComparison} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PricingGoldTiers" component={PricingGoldTiers} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PricingMidnightComparison" component={PricingMidnightComparison} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PricingCrimsonTiers" component={PricingCrimsonTiers} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PricingLavenderComparison" component={PricingLavenderComparison} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PricingArcticTiers" component={PricingArcticTiers} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-PricingEspressoComparison" component={PricingEspressoComparison} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Product-Launch">
      <Composition id="ProductLaunch-DarkHeroReveal" component={ProductLaunchDarkHeroReveal} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ProductLaunch-BoldHeroReveal" component={ProductLaunchBoldHeroReveal} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ProductLaunch-DarkFeatureGrid" component={ProductLaunchDarkFeatureGrid} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ProductLaunch-BoldFeatureGrid" component={ProductLaunchBoldFeatureGrid} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ProductLaunch-DarkCountdown" component={ProductLaunchDarkCountdown} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ProductLaunch-BoldCountdown" component={ProductLaunchBoldCountdown} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ProductLaunch-OceanHeroReveal" component={ProductLaunchOceanHeroReveal} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ProductLaunch-SunsetHeroReveal" component={ProductLaunchSunsetHeroReveal} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ProductLaunch-ForestFeatureGrid" component={ProductLaunchForestFeatureGrid} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ProductLaunch-RoseFeatureGrid" component={ProductLaunchRoseFeatureGrid} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ProductLaunch-GoldCountdown" component={ProductLaunchGoldCountdown} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ProductLaunch-MidnightCountdown" component={ProductLaunchMidnightCountdown} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ProductLaunch-CrimsonHeroReveal" component={ProductLaunchCrimsonHeroReveal} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ProductLaunch-LavenderHeroReveal" component={ProductLaunchLavenderHeroReveal} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ProductLaunch-ArcticFeatureGrid" component={ProductLaunchArcticFeatureGrid} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ProductLaunch-EspressoFeatureGrid" component={ProductLaunchEspressoFeatureGrid} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="">
      <Composition id="-ProjectHealthHealthScorecardDark" component={ProjectHealthHealthScorecardDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ProjectHealthHealthScorecardWarm" component={ProjectHealthHealthScorecardWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ProjectHealthWorkstreamViewDark" component={ProjectHealthWorkstreamViewDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ProjectHealthWorkstreamViewWarm" component={ProjectHealthWorkstreamViewWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ProjectHealthExecutiveSummaryDark" component={ProjectHealthExecutiveSummaryDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ProjectHealthExecutiveSummaryWarm" component={ProjectHealthExecutiveSummaryWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ProjectHealthOceanHealthScorecard" component={ProjectHealthOceanHealthScorecard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ProjectHealthSunsetHealthScorecard" component={ProjectHealthSunsetHealthScorecard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ProjectHealthForestWorkstreamView" component={ProjectHealthForestWorkstreamView} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ProjectHealthRoseWorkstreamView" component={ProjectHealthRoseWorkstreamView} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ProjectHealthGoldExecutiveSummary" component={ProjectHealthGoldExecutiveSummary} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ProjectHealthMidnightExecutiveSummary" component={ProjectHealthMidnightExecutiveSummary} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ProjectHealthCrimsonHealthScorecard" component={ProjectHealthCrimsonHealthScorecard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ProjectHealthLavenderHealthScorecard" component={ProjectHealthLavenderHealthScorecard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ProjectHealthArcticWorkstreamView" component={ProjectHealthArcticWorkstreamView} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ProjectHealthEspressoWorkstreamView" component={ProjectHealthEspressoWorkstreamView} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Proposal">
      <Composition id="Proposal-DarkExecutive" component={ProposalDarkExecutive} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Proposal-CleanCreative" component={ProposalCleanCreative} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Proposal-BoldPitch" component={ProposalBoldPitch} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Proposal-WarmExecutive" component={ProposalWarmExecutive} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Proposal-MinimalCreative" component={ProposalMinimalCreative} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Proposal-NeonPitch" component={ProposalNeonPitch} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Proposal-OceanExecutive" component={ProposalOceanExecutive} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Proposal-SunsetCreative" component={ProposalSunsetCreative} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Proposal-ForestExecutive" component={ProposalForestExecutive} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Proposal-RoseCreative" component={ProposalRoseCreative} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Proposal-GoldExecutive" component={ProposalGoldExecutive} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Proposal-MidnightExecutive" component={ProposalMidnightExecutive} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Proposal-CrimsonPitch" component={ProposalCrimsonPitch} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Proposal-LavenderCreative" component={ProposalLavenderCreative} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Proposal-ArcticCreative" component={ProposalArcticCreative} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Proposal-EspressoExecutive" component={ProposalEspressoExecutive} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="">
      <Composition id="-QBRDashboardExecutiveDark" component={QBRDashboardExecutiveDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-QBRDashboardExecutiveClean" component={QBRDashboardExecutiveClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-QBRDashboardDetailedDark" component={QBRDashboardDetailedDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-QBRDashboardDetailedClean" component={QBRDashboardDetailedClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-QBRDashboardComparisonDark" component={QBRDashboardComparisonDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-QBRDashboardComparisonClean" component={QBRDashboardComparisonClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-QBRDashboardOceanExecutive" component={QBRDashboardOceanExecutive} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-QBRDashboardSunsetExecutive" component={QBRDashboardSunsetExecutive} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-QBRDashboardForestDetailed" component={QBRDashboardForestDetailed} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-QBRDashboardRoseDetailed" component={QBRDashboardRoseDetailed} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-QBRDashboardGoldComparison" component={QBRDashboardGoldComparison} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-QBRDashboardMidnightComparison" component={QBRDashboardMidnightComparison} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-QBRDashboardCrimsonExecutive" component={QBRDashboardCrimsonExecutive} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-QBRDashboardLavenderExecutive" component={QBRDashboardLavenderExecutive} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-QBRDashboardArcticDetailed" component={QBRDashboardArcticDetailed} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-QBRDashboardEspressoDetailed" component={QBRDashboardEspressoDetailed} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Recap">
      <Composition id="Recap-DarkDashboard" component={RecapDarkDashboard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Recap-CleanTimeline" component={RecapCleanTimeline} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Recap-BoldCards" component={RecapBoldCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Recap-WarmDashboard" component={RecapWarmDashboard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Recap-MinimalCards" component={RecapMinimalCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Recap-NeonTimeline" component={RecapNeonTimeline} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Recap-OceanDashboard" component={RecapOceanDashboard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Recap-SunsetCards" component={RecapSunsetCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Recap-ForestTimeline" component={RecapForestTimeline} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Recap-RoseCards" component={RecapRoseCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Recap-GoldDashboard" component={RecapGoldDashboard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Recap-MidnightDashboard" component={RecapMidnightDashboard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Recap-CrimsonCards" component={RecapCrimsonCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Recap-LavenderTimeline" component={RecapLavenderTimeline} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Recap-ArcticTimeline" component={RecapArcticTimeline} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Recap-EspressoDashboard" component={RecapEspressoDashboard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Recipe-Step">
      <Composition id="RecipeStep-WarmIngredientList" component={RecipeStepWarmIngredientList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="RecipeStep-CleanIngredientList" component={RecipeStepCleanIngredientList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="RecipeStep-WarmStepSequence" component={RecipeStepWarmStepSequence} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="RecipeStep-CleanStepSequence" component={RecipeStepCleanStepSequence} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="RecipeStep-WarmSummaryCard" component={RecipeStepWarmSummaryCard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="RecipeStep-CleanSummaryCard" component={RecipeStepCleanSummaryCard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="RecipeStep-OceanIngredientList" component={RecipeStepOceanIngredientList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="RecipeStep-SunsetIngredientList" component={RecipeStepSunsetIngredientList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="RecipeStep-ForestStepSequence" component={RecipeStepForestStepSequence} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="RecipeStep-RoseStepSequence" component={RecipeStepRoseStepSequence} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="RecipeStep-GoldSummaryCard" component={RecipeStepGoldSummaryCard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="RecipeStep-MidnightSummaryCard" component={RecipeStepMidnightSummaryCard} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="RecipeStep-CrimsonIngredientList" component={RecipeStepCrimsonIngredientList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="RecipeStep-LavenderIngredientList" component={RecipeStepLavenderIngredientList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="RecipeStep-ArcticStepSequence" component={RecipeStepArcticStepSequence} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="RecipeStep-EspressoStepSequence" component={RecipeStepEspressoStepSequence} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="">
      <Composition id="-ReleaseNotesChangelogDark" component={ReleaseNotesChangelogDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ReleaseNotesChangelogClean" component={ReleaseNotesChangelogClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ReleaseNotesHighlightsDark" component={ReleaseNotesHighlightsDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ReleaseNotesHighlightsClean" component={ReleaseNotesHighlightsClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ReleaseNotesVersionCompareDark" component={ReleaseNotesVersionCompareDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ReleaseNotesVersionCompareClean" component={ReleaseNotesVersionCompareClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ReleaseNotesOceanChangelog" component={ReleaseNotesOceanChangelog} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ReleaseNotesSunsetChangelog" component={ReleaseNotesSunsetChangelog} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ReleaseNotesForestHighlights" component={ReleaseNotesForestHighlights} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ReleaseNotesRoseHighlights" component={ReleaseNotesRoseHighlights} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ReleaseNotesGoldVersionCompare" component={ReleaseNotesGoldVersionCompare} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ReleaseNotesMidnightVersionCompare" component={ReleaseNotesMidnightVersionCompare} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ReleaseNotesCrimsonChangelog" component={ReleaseNotesCrimsonChangelog} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ReleaseNotesLavenderChangelog" component={ReleaseNotesLavenderChangelog} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ReleaseNotesArcticHighlights" component={ReleaseNotesArcticHighlights} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ReleaseNotesEspressoHighlights" component={ReleaseNotesEspressoHighlights} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="">
      <Composition id="-SocialProofDarkMilestone" component={SocialProofDarkMilestone} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SocialProofCleanAchievement" component={SocialProofCleanAchievement} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SocialProofBoldAnnouncement" component={SocialProofBoldAnnouncement} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SocialProofWarmMilestone" component={SocialProofWarmMilestone} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SocialProofMinimalAchievement" component={SocialProofMinimalAchievement} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SocialProofNeonAnnouncement" component={SocialProofNeonAnnouncement} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SocialProofOceanAchievement" component={SocialProofOceanAchievement} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SocialProofSunsetAnnouncement" component={SocialProofSunsetAnnouncement} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SocialProofForestMilestone" component={SocialProofForestMilestone} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SocialProofRoseAnnouncement" component={SocialProofRoseAnnouncement} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SocialProofGoldAchievement" component={SocialProofGoldAchievement} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SocialProofMidnightAchievement" component={SocialProofMidnightAchievement} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SocialProofCrimsonAnnouncement" component={SocialProofCrimsonAnnouncement} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SocialProofLavenderMilestone" component={SocialProofLavenderMilestone} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SocialProofArcticAchievement" component={SocialProofArcticAchievement} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SocialProofEspressoMilestone" component={SocialProofEspressoMilestone} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="">
      <Composition id="-SprintDashboardKanbanDark" component={SprintDashboardKanbanDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintDashboardKanbanBold" component={SprintDashboardKanbanBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintDashboardVelocityDark" component={SprintDashboardVelocityDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintDashboardVelocityBold" component={SprintDashboardVelocityBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintDashboardBurndownDark" component={SprintDashboardBurndownDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintDashboardBurndownBold" component={SprintDashboardBurndownBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintDashboardOceanKanban" component={SprintDashboardOceanKanban} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintDashboardSunsetKanban" component={SprintDashboardSunsetKanban} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintDashboardForestVelocity" component={SprintDashboardForestVelocity} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintDashboardRoseVelocity" component={SprintDashboardRoseVelocity} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintDashboardGoldBurndown" component={SprintDashboardGoldBurndown} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintDashboardMidnightBurndown" component={SprintDashboardMidnightBurndown} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintDashboardCrimsonKanban" component={SprintDashboardCrimsonKanban} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintDashboardLavenderKanban" component={SprintDashboardLavenderKanban} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintDashboardArcticVelocity" component={SprintDashboardArcticVelocity} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintDashboardEspressoVelocity" component={SprintDashboardEspressoVelocity} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="">
      <Composition id="-SprintRecapShippedListDark" component={SprintRecapShippedListDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintRecapShippedListBold" component={SprintRecapShippedListBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintRecapHighlightCardsDark" component={SprintRecapHighlightCardsDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintRecapHighlightCardsBold" component={SprintRecapHighlightCardsBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintRecapTeamContributionsDark" component={SprintRecapTeamContributionsDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintRecapTeamContributionsBold" component={SprintRecapTeamContributionsBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintRecapOceanShippedList" component={SprintRecapOceanShippedList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintRecapSunsetShippedList" component={SprintRecapSunsetShippedList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintRecapForestHighlightCards" component={SprintRecapForestHighlightCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintRecapRoseHighlightCards" component={SprintRecapRoseHighlightCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintRecapGoldTeamContributions" component={SprintRecapGoldTeamContributions} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintRecapMidnightTeamContributions" component={SprintRecapMidnightTeamContributions} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintRecapCrimsonShippedList" component={SprintRecapCrimsonShippedList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintRecapLavenderShippedList" component={SprintRecapLavenderShippedList} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintRecapArcticHighlightCards" component={SprintRecapArcticHighlightCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-SprintRecapEspressoHighlightCards" component={SprintRecapEspressoHighlightCards} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="">
      <Composition id="-StoreLocatorFinderClean" component={StoreLocatorFinderClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-StoreLocatorFinderMinimal" component={StoreLocatorFinderMinimal} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-StoreLocatorMapPinsClean" component={StoreLocatorMapPinsClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-StoreLocatorMapPinsMinimal" component={StoreLocatorMapPinsMinimal} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-StoreLocatorDirectoryClean" component={StoreLocatorDirectoryClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-StoreLocatorDirectoryMinimal" component={StoreLocatorDirectoryMinimal} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-StoreLocatorOceanFinder" component={StoreLocatorOceanFinder} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-StoreLocatorSunsetMapPins" component={StoreLocatorSunsetMapPins} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-StoreLocatorForestDirectory" component={StoreLocatorForestDirectory} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-StoreLocatorRoseFinder" component={StoreLocatorRoseFinder} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-StoreLocatorGoldMapPins" component={StoreLocatorGoldMapPins} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-StoreLocatorMidnightDirectory" component={StoreLocatorMidnightDirectory} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-StoreLocatorCrimsonFinder" component={StoreLocatorCrimsonFinder} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-StoreLocatorLavenderMapPins" component={StoreLocatorLavenderMapPins} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-StoreLocatorArcticDirectory" component={StoreLocatorArcticDirectory} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-StoreLocatorEspressoFinder" component={StoreLocatorEspressoFinder} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Testimonial">
      <Composition id="Testimonial-DarkCentered" component={TestimonialDarkCentered} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Testimonial-CleanSplit" component={TestimonialCleanSplit} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Testimonial-BoldEditorial" component={TestimonialBoldEditorial} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Testimonial-WarmCentered" component={TestimonialWarmCentered} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Testimonial-MinimalEditorial" component={TestimonialMinimalEditorial} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Testimonial-NeonSplit" component={TestimonialNeonSplit} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Testimonial-OceanCentered" component={TestimonialOceanCentered} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Testimonial-SunsetSplit" component={TestimonialSunsetSplit} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Testimonial-ForestCentered" component={TestimonialForestCentered} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Testimonial-RoseEditorial" component={TestimonialRoseEditorial} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Testimonial-GoldCentered" component={TestimonialGoldCentered} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Testimonial-MidnightCentered" component={TestimonialMidnightCentered} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Testimonial-CrimsonEditorial" component={TestimonialCrimsonEditorial} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Testimonial-LavenderSplit" component={TestimonialLavenderSplit} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Testimonial-ArcticSplit" component={TestimonialArcticSplit} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Testimonial-EspressoCentered" component={TestimonialEspressoCentered} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="">
      <Composition id="-ThoughtLeadershipEditorialDark" component={ThoughtLeadershipEditorialDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ThoughtLeadershipEditorialClean" component={ThoughtLeadershipEditorialClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ThoughtLeadershipNarrativeDark" component={ThoughtLeadershipNarrativeDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ThoughtLeadershipNarrativeClean" component={ThoughtLeadershipNarrativeClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ThoughtLeadershipKeynoteDark" component={ThoughtLeadershipKeynoteDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ThoughtLeadershipKeynoteClean" component={ThoughtLeadershipKeynoteClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ThoughtLeadershipOceanEditorial" component={ThoughtLeadershipOceanEditorial} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ThoughtLeadershipSunsetNarrative" component={ThoughtLeadershipSunsetNarrative} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ThoughtLeadershipForestKeynote" component={ThoughtLeadershipForestKeynote} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ThoughtLeadershipRoseEditorial" component={ThoughtLeadershipRoseEditorial} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ThoughtLeadershipGoldNarrative" component={ThoughtLeadershipGoldNarrative} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ThoughtLeadershipMidnightKeynote" component={ThoughtLeadershipMidnightKeynote} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ThoughtLeadershipCrimsonEditorial" component={ThoughtLeadershipCrimsonEditorial} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ThoughtLeadershipLavenderNarrative" component={ThoughtLeadershipLavenderNarrative} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ThoughtLeadershipArcticKeynote" component={ThoughtLeadershipArcticKeynote} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-ThoughtLeadershipEspressoEditorial" component={ThoughtLeadershipEspressoEditorial} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="">
      <Composition id="-TravelItineraryDayByDayWarm" component={TravelItineraryDayByDayWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-TravelItineraryDayByDayBold" component={TravelItineraryDayByDayBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-TravelItineraryRouteOverviewWarm" component={TravelItineraryRouteOverviewWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-TravelItineraryRouteOverviewBold" component={TravelItineraryRouteOverviewBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-TravelItineraryHighlightsWarm" component={TravelItineraryHighlightsWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-TravelItineraryHighlightsBold" component={TravelItineraryHighlightsBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-TravelItineraryOceanDayByDay" component={TravelItineraryOceanDayByDay} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-TravelItinerarySunsetDayByDay" component={TravelItinerarySunsetDayByDay} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-TravelItineraryForestRouteOverview" component={TravelItineraryForestRouteOverview} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-TravelItineraryRoseRouteOverview" component={TravelItineraryRoseRouteOverview} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-TravelItineraryGoldHighlights" component={TravelItineraryGoldHighlights} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-TravelItineraryMidnightHighlights" component={TravelItineraryMidnightHighlights} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-TravelItineraryCrimsonDayByDay" component={TravelItineraryCrimsonDayByDay} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-TravelItineraryLavenderDayByDay" component={TravelItineraryLavenderDayByDay} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-TravelItineraryArcticRouteOverview" component={TravelItineraryArcticRouteOverview} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-TravelItineraryEspressoRouteOverview" component={TravelItineraryEspressoRouteOverview} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Tutorial">
      <Composition id="Tutorial-DarkNumberedSteps" component={TutorialDarkNumberedSteps} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Tutorial-CleanNumberedSteps" component={TutorialCleanNumberedSteps} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Tutorial-DarkCardSequence" component={TutorialDarkCardSequence} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Tutorial-CleanCardSequence" component={TutorialCleanCardSequence} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Tutorial-DarkSplitDemo" component={TutorialDarkSplitDemo} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Tutorial-CleanSplitDemo" component={TutorialCleanSplitDemo} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Tutorial-OceanNumberedSteps" component={TutorialOceanNumberedSteps} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Tutorial-SunsetNumberedSteps" component={TutorialSunsetNumberedSteps} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Tutorial-ForestCardSequence" component={TutorialForestCardSequence} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Tutorial-RoseCardSequence" component={TutorialRoseCardSequence} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Tutorial-GoldSplitDemo" component={TutorialGoldSplitDemo} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Tutorial-MidnightSplitDemo" component={TutorialMidnightSplitDemo} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Tutorial-CrimsonNumberedSteps" component={TutorialCrimsonNumberedSteps} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Tutorial-LavenderNumberedSteps" component={TutorialLavenderNumberedSteps} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Tutorial-ArcticCardSequence" component={TutorialArcticCardSequence} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="Tutorial-EspressoCardSequence" component={TutorialEspressoCardSequence} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="">
      <Composition id="-VelocityChartBarChartDark" component={VelocityChartBarChartDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-VelocityChartBarChartClean" component={VelocityChartBarChartClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-VelocityChartTrendLineDark" component={VelocityChartTrendLineDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-VelocityChartTrendLineClean" component={VelocityChartTrendLineClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-VelocityChartSummaryDark" component={VelocityChartSummaryDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-VelocityChartSummaryClean" component={VelocityChartSummaryClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-VelocityChartOceanBarChart" component={VelocityChartOceanBarChart} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-VelocityChartSunsetBarChart" component={VelocityChartSunsetBarChart} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-VelocityChartForestTrendLine" component={VelocityChartForestTrendLine} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-VelocityChartRoseTrendLine" component={VelocityChartRoseTrendLine} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-VelocityChartGoldSummary" component={VelocityChartGoldSummary} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-VelocityChartMidnightSummary" component={VelocityChartMidnightSummary} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-VelocityChartCrimsonBarChart" component={VelocityChartCrimsonBarChart} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-VelocityChartLavenderBarChart" component={VelocityChartLavenderBarChart} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-VelocityChartArcticTrendLine" component={VelocityChartArcticTrendLine} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="-VelocityChartEspressoTrendLine" component={VelocityChartEspressoTrendLine} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    {/* ══ Effect Templates (reactvideoeditor/remotion-templates) ══ */}

    <Folder name="Animated-List">
      <Composition id="AnimatedList-Dark" component={AnimatedListDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedList-Clean" component={AnimatedListClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedList-Bold" component={AnimatedListBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedList-Warm" component={AnimatedListWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedList-Minimal" component={AnimatedListMinimal} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedList-Neon" component={AnimatedListNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedList-Ocean" component={AnimatedListOcean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedList-Sunset" component={AnimatedListSunset} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedList-Forest" component={AnimatedListForest} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedList-Rose" component={AnimatedListRose} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedList-Gold" component={AnimatedListGold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedList-Midnight" component={AnimatedListMidnight} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedList-Crimson" component={AnimatedListCrimson} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedList-Lavender" component={AnimatedListLavender} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedList-Arctic" component={AnimatedListArctic} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedList-Espresso" component={AnimatedListEspresso} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Animated-Text">
      <Composition id="AnimatedText-Dark" component={AnimatedTextDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedText-Clean" component={AnimatedTextClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedText-Bold" component={AnimatedTextBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedText-Warm" component={AnimatedTextWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedText-Minimal" component={AnimatedTextMinimal} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedText-Neon" component={AnimatedTextNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedText-Ocean" component={AnimatedTextOcean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedText-Sunset" component={AnimatedTextSunset} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedText-Forest" component={AnimatedTextForest} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedText-Rose" component={AnimatedTextRose} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedText-Gold" component={AnimatedTextGold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedText-Midnight" component={AnimatedTextMidnight} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedText-Crimson" component={AnimatedTextCrimson} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedText-Lavender" component={AnimatedTextLavender} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedText-Arctic" component={AnimatedTextArctic} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="AnimatedText-Espresso" component={AnimatedTextEspresso} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Bounce-Text">
      <Composition id="BounceText-Dark" component={BounceTextDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BounceText-Clean" component={BounceTextClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BounceText-Bold" component={BounceTextBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BounceText-Warm" component={BounceTextWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BounceText-Minimal" component={BounceTextMinimal} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BounceText-Neon" component={BounceTextNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BounceText-Ocean" component={BounceTextOcean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BounceText-Sunset" component={BounceTextSunset} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BounceText-Forest" component={BounceTextForest} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BounceText-Rose" component={BounceTextRose} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BounceText-Gold" component={BounceTextGold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BounceText-Midnight" component={BounceTextMidnight} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BounceText-Crimson" component={BounceTextCrimson} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BounceText-Lavender" component={BounceTextLavender} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BounceText-Arctic" component={BounceTextArctic} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BounceText-Espresso" component={BounceTextEspresso} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Bubble-Pop-Text">
      <Composition id="BubblePopText-Dark" component={BubblePopTextDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BubblePopText-Clean" component={BubblePopTextClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BubblePopText-Bold" component={BubblePopTextBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BubblePopText-Warm" component={BubblePopTextWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BubblePopText-Minimal" component={BubblePopTextMinimal} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BubblePopText-Neon" component={BubblePopTextNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BubblePopText-Ocean" component={BubblePopTextOcean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BubblePopText-Sunset" component={BubblePopTextSunset} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BubblePopText-Forest" component={BubblePopTextForest} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BubblePopText-Rose" component={BubblePopTextRose} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BubblePopText-Gold" component={BubblePopTextGold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BubblePopText-Midnight" component={BubblePopTextMidnight} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BubblePopText-Crimson" component={BubblePopTextCrimson} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BubblePopText-Lavender" component={BubblePopTextLavender} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BubblePopText-Arctic" component={BubblePopTextArctic} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="BubblePopText-Espresso" component={BubblePopTextEspresso} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Card-Flip">
      <Composition id="CardFlip-Dark" component={CardFlipDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CardFlip-Clean" component={CardFlipClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CardFlip-Bold" component={CardFlipBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CardFlip-Warm" component={CardFlipWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CardFlip-Minimal" component={CardFlipMinimal} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CardFlip-Neon" component={CardFlipNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CardFlip-Ocean" component={CardFlipOcean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CardFlip-Sunset" component={CardFlipSunset} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CardFlip-Forest" component={CardFlipForest} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CardFlip-Rose" component={CardFlipRose} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CardFlip-Gold" component={CardFlipGold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CardFlip-Midnight" component={CardFlipMidnight} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CardFlip-Crimson" component={CardFlipCrimson} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CardFlip-Lavender" component={CardFlipLavender} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CardFlip-Arctic" component={CardFlipArctic} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="CardFlip-Espresso" component={CardFlipEspresso} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Floating-Bubble">
      <Composition id="FloatingBubble-Dark" component={FloatingBubbleDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FloatingBubble-Clean" component={FloatingBubbleClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FloatingBubble-Bold" component={FloatingBubbleBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FloatingBubble-Warm" component={FloatingBubbleWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FloatingBubble-Minimal" component={FloatingBubbleMinimal} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FloatingBubble-Neon" component={FloatingBubbleNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FloatingBubble-Ocean" component={FloatingBubbleOcean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FloatingBubble-Sunset" component={FloatingBubbleSunset} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FloatingBubble-Forest" component={FloatingBubbleForest} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FloatingBubble-Rose" component={FloatingBubbleRose} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FloatingBubble-Gold" component={FloatingBubbleGold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FloatingBubble-Midnight" component={FloatingBubbleMidnight} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FloatingBubble-Crimson" component={FloatingBubbleCrimson} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FloatingBubble-Lavender" component={FloatingBubbleLavender} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FloatingBubble-Arctic" component={FloatingBubbleArctic} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="FloatingBubble-Espresso" component={FloatingBubbleEspresso} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Geometric-Patterns">
      <Composition id="GeometricPatterns-Dark" component={GeometricPatternsDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GeometricPatterns-Clean" component={GeometricPatternsClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GeometricPatterns-Bold" component={GeometricPatternsBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GeometricPatterns-Warm" component={GeometricPatternsWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GeometricPatterns-Minimal" component={GeometricPatternsMinimal} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GeometricPatterns-Neon" component={GeometricPatternsNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GeometricPatterns-Ocean" component={GeometricPatternsOcean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GeometricPatterns-Sunset" component={GeometricPatternsSunset} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GeometricPatterns-Forest" component={GeometricPatternsForest} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GeometricPatterns-Rose" component={GeometricPatternsRose} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GeometricPatterns-Gold" component={GeometricPatternsGold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GeometricPatterns-Midnight" component={GeometricPatternsMidnight} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GeometricPatterns-Crimson" component={GeometricPatternsCrimson} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GeometricPatterns-Lavender" component={GeometricPatternsLavender} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GeometricPatterns-Arctic" component={GeometricPatternsArctic} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GeometricPatterns-Espresso" component={GeometricPatternsEspresso} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Glitch-Text">
      <Composition id="GlitchText-Dark" component={GlitchTextDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GlitchText-Clean" component={GlitchTextClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GlitchText-Bold" component={GlitchTextBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GlitchText-Warm" component={GlitchTextWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GlitchText-Minimal" component={GlitchTextMinimal} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GlitchText-Neon" component={GlitchTextNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GlitchText-Ocean" component={GlitchTextOcean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GlitchText-Sunset" component={GlitchTextSunset} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GlitchText-Forest" component={GlitchTextForest} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GlitchText-Rose" component={GlitchTextRose} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GlitchText-Gold" component={GlitchTextGold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GlitchText-Midnight" component={GlitchTextMidnight} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GlitchText-Crimson" component={GlitchTextCrimson} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GlitchText-Lavender" component={GlitchTextLavender} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GlitchText-Arctic" component={GlitchTextArctic} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="GlitchText-Espresso" component={GlitchTextEspresso} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Liquid-Wave">
      <Composition id="LiquidWave-Dark" component={LiquidWaveDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="LiquidWave-Clean" component={LiquidWaveClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="LiquidWave-Bold" component={LiquidWaveBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="LiquidWave-Warm" component={LiquidWaveWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="LiquidWave-Minimal" component={LiquidWaveMinimal} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="LiquidWave-Neon" component={LiquidWaveNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="LiquidWave-Ocean" component={LiquidWaveOcean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="LiquidWave-Sunset" component={LiquidWaveSunset} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="LiquidWave-Forest" component={LiquidWaveForest} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="LiquidWave-Rose" component={LiquidWaveRose} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="LiquidWave-Gold" component={LiquidWaveGold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="LiquidWave-Midnight" component={LiquidWaveMidnight} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="LiquidWave-Crimson" component={LiquidWaveCrimson} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="LiquidWave-Lavender" component={LiquidWaveLavender} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="LiquidWave-Arctic" component={LiquidWaveArctic} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="LiquidWave-Espresso" component={LiquidWaveEspresso} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Matrix-Rain">
      <Composition id="MatrixRain-Dark" component={MatrixRainDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MatrixRain-Clean" component={MatrixRainClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MatrixRain-Bold" component={MatrixRainBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MatrixRain-Warm" component={MatrixRainWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MatrixRain-Minimal" component={MatrixRainMinimal} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MatrixRain-Neon" component={MatrixRainNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MatrixRain-Ocean" component={MatrixRainOcean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MatrixRain-Sunset" component={MatrixRainSunset} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MatrixRain-Forest" component={MatrixRainForest} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MatrixRain-Rose" component={MatrixRainRose} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MatrixRain-Gold" component={MatrixRainGold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MatrixRain-Midnight" component={MatrixRainMidnight} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MatrixRain-Crimson" component={MatrixRainCrimson} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MatrixRain-Lavender" component={MatrixRainLavender} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MatrixRain-Arctic" component={MatrixRainArctic} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="MatrixRain-Espresso" component={MatrixRainEspresso} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Particle-Explosion">
      <Composition id="ParticleExplosion-Dark" component={ParticleExplosionDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ParticleExplosion-Clean" component={ParticleExplosionClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ParticleExplosion-Bold" component={ParticleExplosionBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ParticleExplosion-Warm" component={ParticleExplosionWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ParticleExplosion-Minimal" component={ParticleExplosionMinimal} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ParticleExplosion-Neon" component={ParticleExplosionNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ParticleExplosion-Ocean" component={ParticleExplosionOcean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ParticleExplosion-Sunset" component={ParticleExplosionSunset} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ParticleExplosion-Forest" component={ParticleExplosionForest} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ParticleExplosion-Rose" component={ParticleExplosionRose} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ParticleExplosion-Gold" component={ParticleExplosionGold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ParticleExplosion-Midnight" component={ParticleExplosionMidnight} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ParticleExplosion-Crimson" component={ParticleExplosionCrimson} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ParticleExplosion-Lavender" component={ParticleExplosionLavender} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ParticleExplosion-Arctic" component={ParticleExplosionArctic} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="ParticleExplosion-Espresso" component={ParticleExplosionEspresso} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Pulsing-Text">
      <Composition id="PulsingText-Dark" component={PulsingTextDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PulsingText-Clean" component={PulsingTextClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PulsingText-Bold" component={PulsingTextBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PulsingText-Warm" component={PulsingTextWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PulsingText-Minimal" component={PulsingTextMinimal} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PulsingText-Neon" component={PulsingTextNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PulsingText-Ocean" component={PulsingTextOcean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PulsingText-Sunset" component={PulsingTextSunset} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PulsingText-Forest" component={PulsingTextForest} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PulsingText-Rose" component={PulsingTextRose} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PulsingText-Gold" component={PulsingTextGold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PulsingText-Midnight" component={PulsingTextMidnight} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PulsingText-Crimson" component={PulsingTextCrimson} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PulsingText-Lavender" component={PulsingTextLavender} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PulsingText-Arctic" component={PulsingTextArctic} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="PulsingText-Espresso" component={PulsingTextEspresso} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Slide-Text">
      <Composition id="SlideText-Dark" component={SlideTextDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SlideText-Clean" component={SlideTextClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SlideText-Bold" component={SlideTextBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SlideText-Warm" component={SlideTextWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SlideText-Minimal" component={SlideTextMinimal} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SlideText-Neon" component={SlideTextNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SlideText-Ocean" component={SlideTextOcean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SlideText-Sunset" component={SlideTextSunset} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SlideText-Forest" component={SlideTextForest} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SlideText-Rose" component={SlideTextRose} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SlideText-Gold" component={SlideTextGold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SlideText-Midnight" component={SlideTextMidnight} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SlideText-Crimson" component={SlideTextCrimson} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SlideText-Lavender" component={SlideTextLavender} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SlideText-Arctic" component={SlideTextArctic} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SlideText-Espresso" component={SlideTextEspresso} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Sound-Wave">
      <Composition id="SoundWave-Dark" component={SoundWaveDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SoundWave-Clean" component={SoundWaveClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SoundWave-Bold" component={SoundWaveBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SoundWave-Warm" component={SoundWaveWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SoundWave-Minimal" component={SoundWaveMinimal} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SoundWave-Neon" component={SoundWaveNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SoundWave-Ocean" component={SoundWaveOcean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SoundWave-Sunset" component={SoundWaveSunset} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SoundWave-Forest" component={SoundWaveForest} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SoundWave-Rose" component={SoundWaveRose} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SoundWave-Gold" component={SoundWaveGold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SoundWave-Midnight" component={SoundWaveMidnight} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SoundWave-Crimson" component={SoundWaveCrimson} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SoundWave-Lavender" component={SoundWaveLavender} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SoundWave-Arctic" component={SoundWaveArctic} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="SoundWave-Espresso" component={SoundWaveEspresso} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    <Folder name="Typewriter-Subtitle">
      <Composition id="TypewriterSubtitle-Dark" component={TypewriterSubtitleDark} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="TypewriterSubtitle-Clean" component={TypewriterSubtitleClean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="TypewriterSubtitle-Bold" component={TypewriterSubtitleBold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="TypewriterSubtitle-Warm" component={TypewriterSubtitleWarm} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="TypewriterSubtitle-Minimal" component={TypewriterSubtitleMinimal} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="TypewriterSubtitle-Neon" component={TypewriterSubtitleNeon} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="TypewriterSubtitle-Ocean" component={TypewriterSubtitleOcean} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="TypewriterSubtitle-Sunset" component={TypewriterSubtitleSunset} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="TypewriterSubtitle-Forest" component={TypewriterSubtitleForest} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="TypewriterSubtitle-Rose" component={TypewriterSubtitleRose} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="TypewriterSubtitle-Gold" component={TypewriterSubtitleGold} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="TypewriterSubtitle-Midnight" component={TypewriterSubtitleMidnight} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="TypewriterSubtitle-Crimson" component={TypewriterSubtitleCrimson} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="TypewriterSubtitle-Lavender" component={TypewriterSubtitleLavender} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="TypewriterSubtitle-Arctic" component={TypewriterSubtitleArctic} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="TypewriterSubtitle-Espresso" component={TypewriterSubtitleEspresso} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    {/* ── Linda Mohamed Personal Deck ─────────────────────────────── */}
    <Folder name="Linda-Mohamed-Personal-Deck">
      <Composition id="LindaMohamed-Cover"          component={Folie1Cover}          durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="LindaMohamed-AboutMe"        component={Folie2AboutMe}        durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="LindaMohamed-WhatIOffer"     component={Folie3WhatIOffer}     durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="LindaMohamed-CostsPackages"  component={Folie4CostsPackages}  durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="LindaMohamedV2-Cover"        component={Folie1CoverV2}        durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="LindaMohamedV2-AboutMe"      component={Folie2AboutMeV2}      durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="LindaMohamedV2-WhatIOffer"   component={Folie3WhatIOfferV2}   durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="LindaMohamedV2-Costs"        component={Folie4CostsPackagesV2} durationInFrames={DUR} fps={FPS} width={W} height={H} />
      <Composition id="LindaMohamedV2-Workshops"    component={Folie5WorkshopsV2}    durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    {/* ── YouTube Tutorial ───────────────────────────────────────── */}
    <Folder name="YouTube-Tutorial">
      <Composition id="YouTubeTutorial-VideoFlowPipeline" component={VideoFlowPipelineTutorial} durationInFrames={DUR} fps={FPS} width={W} height={H} />
    </Folder>

    {/* ── Community GameDay Europe ───────────────────────────────── */}
    <Folder name="GameDay">
      <Composition id="GameDay-MarketingVideo"        component={MarketingVideo}        durationInFrames={640}   fps={FPS} width={W} height={H} />
      <Composition id="GameDay-Countdown"             component={Countdown}             durationInFrames={18000} fps={FPS} width={W} height={H} defaultProps={{ loopIteration: 0 }} />
      <Composition id="GameDay-InfoLoop"              component={InfoLoop}              durationInFrames={54000} fps={FPS} width={W} height={H} />
      <Composition id="GameDay-MainEvent"             component={MainEvent}             durationInFrames={54000} fps={FPS} width={W} height={H} />
      <Composition id="GameDay-Gameplay"              component={Gameplay}              durationInFrames={216000} fps={FPS} width={W} height={H} />
      <Composition id="GameDay-ClosingPreRendered"    component={ClosingPreRendered}    durationInFrames={4200}  fps={FPS} width={W} height={H} />
      <Composition id="GameDay-ClosingWinnersTemplate" component={ClosingWinnersTemplate} durationInFrames={9000} fps={FPS} width={W} height={H} />
      <Composition id="GameDay-QuestsLive"            component={QuestsLive}            durationInFrames={900}   fps={FPS} width={W} height={H} />
      <Composition id="GameDay-HalfTime"              component={HalfTime}              durationInFrames={900}   fps={FPS} width={W} height={H} />
      <Composition id="GameDay-FinalCountdown"        component={FinalCountdown}        durationInFrames={900}   fps={FPS} width={W} height={H} defaultProps={{ minutesRemaining: 15 }} />
      <Composition id="GameDay-GameExtended"          component={GameExtended}          durationInFrames={900}   fps={FPS} width={W} height={H} defaultProps={{ extraMinutes: 15 }} />
      <Composition id="GameDay-LeaderboardHidden"     component={LeaderboardHidden}     durationInFrames={900}   fps={FPS} width={W} height={H} />
      <Composition id="GameDay-ScoresCalculating"     component={ScoresCalculating}     durationInFrames={900}   fps={FPS} width={W} height={H} />
      <Composition id="GameDay-BreakAnnouncement"     component={BreakAnnouncement}     durationInFrames={900}   fps={FPS} width={W} height={H} />
      <Composition id="GameDay-WelcomeBack"           component={WelcomeBack}           durationInFrames={900}   fps={FPS} width={W} height={H} />
      <Composition id="GameDay-FirstCompletion"       component={FirstCompletion}       durationInFrames={900}   fps={FPS} width={W} height={H} />
      <Composition id="GameDay-CloseRace"             component={CloseRace}             durationInFrames={900}   fps={FPS} width={W} height={H} />
      <Composition id="GameDay-ComebackAlert"         component={ComebackAlert}         durationInFrames={900}   fps={FPS} width={W} height={H} />
      <Composition id="GameDay-TopTeams"              component={TopTeams}              durationInFrames={900}   fps={FPS} width={W} height={H} />
      <Composition id="GameDay-CollectiveMilestone"   component={CollectiveMilestone}   durationInFrames={900}   fps={FPS} width={W} height={H} />
      <Composition id="GameDay-TeamSpotlight"         component={TeamSpotlight}         durationInFrames={900}   fps={FPS} width={W} height={H} />
      <Composition id="GameDay-QuestFixed"            component={QuestFixed}            durationInFrames={900}   fps={FPS} width={W} height={H} />
      <Composition id="GameDay-QuestBroken"           component={QuestBroken}           durationInFrames={900}   fps={FPS} width={W} height={H} />
      <Composition id="GameDay-QuestUpdate"           component={QuestUpdate}           durationInFrames={900}   fps={FPS} width={W} height={H} />
      <Composition id="GameDay-QuestHint"             component={QuestHint}             durationInFrames={900}   fps={FPS} width={W} height={H} />
      <Composition id="GameDay-NewQuestAvailable"     component={NewQuestAvailable}     durationInFrames={900}   fps={FPS} width={W} height={H} />
      <Composition id="GameDay-SurveyReminder"        component={SurveyReminder}        durationInFrames={900}   fps={FPS} width={W} height={H} />
      <Composition id="GameDay-StreamInterruption"    component={StreamInterruption}    durationInFrames={900}   fps={FPS} width={W} height={H} />
      <Composition id="GameDay-TechnicalIssue"        component={TechnicalIssue}        durationInFrames={900}   fps={FPS} width={W} height={H} />
      <Composition id="GameDay-Leaderboard"           component={Leaderboard}           durationInFrames={900}   fps={FPS} width={W} height={H} />
      <Composition id="GameDay-ScoreCorrection"       component={ScoreCorrection}       durationInFrames={900}   fps={FPS} width={W} height={H} />
      <Composition id="GameDay-GamemastersUpdate"     component={GamemastersUpdate}     durationInFrames={900}   fps={FPS} width={W} height={H} />
      <Composition id="GameDay-StreamHostUpdate"      component={StreamHostUpdate}      durationInFrames={900}   fps={FPS} width={W} height={H} />
      <Composition id="GameDay-LocationShoutout"      component={LocationShoutout}      durationInFrames={900}   fps={FPS} width={W} height={H} />
      <Composition id="GameDay-ImportantReminder"     component={ImportantReminder}     durationInFrames={900}   fps={FPS} width={W} height={H} />
    </Folder>

  </>
);
