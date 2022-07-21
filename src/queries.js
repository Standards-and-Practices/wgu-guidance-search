import gql from 'graphql-tag';

const getApproaches = gql`
	query getApproaches {
		approaches(first: 1000, where: { orderby: NAME, hideEmpty: true, parent: 0 }) {
			edges {
				node {
					databaseId
					name
					uri
					count
					children(first: 100) {
						edges {
							node {
								id
								count
								databaseId
								link
								name
								contentNodes {
									edges {
										node {
											contentType {
												node {
													id
													name
												}
											}
											contentTypeName
											databaseId
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;

const getAssets = gql`
	query getAssets {
		assets(first: 1000, where: { orderby: NAME, hideEmpty: true, parent: 0 }) {
			edges {
				node {
					databaseId
					name
					uri
					count
					children(first: 100) {
						edges {
							node {
								id
								name
								count
								databaseId
								link
								contentNodes {
									edges {
										node {
											contentType {
												node {
													id
													name
												}
											}
											contentTypeName
											databaseId
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;

const getDomains = gql`
	query getDomains {
		domains(first: 1000, where: { orderby: TERM_ORDER }) {
			edges {
				node {
					databaseId
					name
					uri
					description
					count
					displaySettings {
						color
						fadedColor
						inactiveIcon {
							sourceUrl(size: LARGE)
						}
						activeIcon {
							sourceUrl(size: LARGE)
						}
					}
				}
			}
		}
	}
`;

const getStandards = gql`
	query getStandards($where: RootQueryToStandardConnectionWhereArgs = { taxQuery: {}, search: "" }) {
		standards(first: 100, where: $where) {
			edges {
				node {
					domains {
						edges {
							node {
								databaseId
								name
								displaySettings {
									activeIcon {
										sourceUrl
									}
									inactiveIcon {
										sourceUrl
									}
									color
									fadedColor
								}
								uri
							}
						}
					}
					uri
					link
					title
					principles {
						edges {
							node {
								name
								uri
								databaseId
							}
						}
					}
					guidance {
						guidance {
							guidanceStatement
							guidanceDetails
							guidanceRationale
							guidanceExamples {
								__typename
								... on Standard_Guidance_guidance_GuidanceExamples_DoDontText {
									doDescription
									doText
									dontDescription
									dontText
								}
								... on Standard_Guidance_guidance_GuidanceExamples_DoDontImage {
									doCaption
									doImage {
										sourceUrl
									}
									dontCaption
									dontImage {
										sourceUrl
									}
								}
								... on Standard_Guidance_guidance_GuidanceExamples_Text {
									text
								}
								... on Standard_Guidance_guidance_GuidanceExamples_Media {
									file {
										sourceUrl
									}
								}
								... on Standard_Guidance_guidance_GuidanceExamples_Code {
									code
								}
								... on Standard_Guidance_guidance_GuidanceExamples_InfoBlock {
									text
								}
							}
						}
					}
				}
			}
		}
	}
`;

export default {
	getApproaches,
	getAssets,
	getDomains,
	getStandards,
};
