import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager'

import axios from 'axios'

export const handler = async (event) => {
  const secretName = 'be-awesome-dev-github-actions-token'

  const client = new SecretsManagerClient({
    region: 'ap-southeast-1',
  })

  try {
    const secretResponse = await client.send(
      new GetSecretValueCommand({
        SecretId: secretName,
        VersionStage: 'AWSCURRENT',
      })
    )

    const secret = JSON.parse(secretResponse.SecretString)
    const secretValue = secret[secretName]
    const githubActionPayload = {
      ref: 'main',
    }
    const repoOwner = 'KhoaNam225'
    const repoName = 'be-awesome-dev'
    const workflowId = '86481903'
    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/actions/workflows/${workflowId}/dispatches`

    const githubResponse = await axios.post(url, githubActionPayload, {
      headers: {
        Authorization: `token ${secretValue}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    })

    if (githubResponse.status === 204) {
      return { status: 'Succeeded' }
    } else {
      return { status: 'Failed' }
    }
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error
  }
}
