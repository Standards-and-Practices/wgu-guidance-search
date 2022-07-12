import gql from 'graphql-tag';

const getApproaches = gql`query getApproaches {
    approaches(where: {orderby: NAME, hideEmpty: true, parent: 0}) {
      edges {
        node {
          id
          name
          uri
          count
        }
      }
    }
}`;

const getAssets = gql`query getAssets {
    assets(where: {orderby: NAME, hideEmpty: true, parent: 0}) {
      edges {
        node {
          id
          name
          uri
          count
        }
      }
    }
  }`;

const getDomains = gql`
	query getDomains {
		domains {
			edges {
				node {
					id
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
	query getStandards($search: String!) {
  standards(where: {search: $search, status: PUBLISH}) {
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
        guidance{
          guidance{
            guidanceStatement
            guidanceDetails
            guidanceRationale
            guidanceExamples{
              __typename
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
