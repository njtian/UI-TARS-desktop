/*
 * Copyright (c) 2025 Bytedance, Inc. and its affiliates.
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComposableAgent } from '@omni-tars/core';
import { AgentWebUIImplementation } from '@tarko/interface';
import { getComposableOption, OmniTarsOption } from './options';

const sandboxBaseUrl = process.env.AIO_SANDBOX_URL ?? '.';
export default class OmniTARSAgent extends ComposableAgent {
  static label = 'Omni Agent';

  static webuiConfig: AgentWebUIImplementation = {
    logo: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/zyha-aulnh/ljhwZthlaukjlkulzlp/icon.png',
    title: 'Omni Agent',
    subtitle: 'Offering seamless integration with a wide range of real-world tools.',
    welcomTitle: 'Let’s work it out',
    welcomePrompts: [],
    welcomeCards: [
      {
        title: '2048',
        category: 'Game',
        // prompt: `Play this game, your target score is 1024`,
        image:
          'https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=628,height=628,fit=cover,f=auto/cb8c967c-4a78-4ffa-8506-cbac69746f4f/2048.png',
        agentOptions: {
          agentMode: {
            id: 'game',
            link: 'https://poki.com/zh/g/2048',
            browserMode: 'hybrid',
          },
        },
      },
      {
        title: 'Four in a Row',
        category: 'Game',
        // prompt: `Play this game, win the computer`,
        image:
          'https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=628,height=628,fit=cover,f=auto/e80686db-b0fb-4f2c-bd2f-3a89734f102a/four-in-a-row.jpg',
        agentOptions: {
          agentMode: {
            id: 'game',
            link: 'https://poki.com/zh/g/four-in-a-row',
            browserMode: 'hybrid',
          },
        },
      },
      {
        title: 'Block the Pig',
        category: 'Game',
        // prompt: `Play this game, reach level 5`,
        image:
          'https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=628,height=628,fit=cover,f=auto/9fec1234ce2afd5e789f56da463dcffc/block-the-pig.jpeg',
        agentOptions: {
          agentMode: {
            id: 'game',
            link: 'https://poki.com/zh/g/block-the-pig',
            browserMode: 'hybrid',
          },
        },
      },
      {
        title: 'Factory Balls Forever',
        category: 'Game',
        // prompt: `Play this game, reach level 5`,
        image:
          'https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=628,height=628,fit=cover,f=auto/2a503d0a1d9475d6e62c7ea11caa429ab952aa8f500755613a34e66e2196fe82/factory-balls-forever.png',
        agentOptions: {
          agentMode: {
            id: 'game',
            link: 'https://poki.com/zh/g/factory-balls-forever',
            browserMode: 'hybrid',
          },
        },
      },
      {
        title: 'Cubinko',
        category: 'Game',
        // prompt: `Play this game, reach level 5`,
        image:
          'https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=628,height=628,fit=cover,f=auto/894ed059623f65b643795d0e70ed41cd/cubinko.png',
        agentOptions: {
          agentMode: {
            id: 'game',
            link: 'https://poki.com/zh/g/cubinko',
            browserMode: 'hybrid',
          },
        },
      },
      {
        title: 'Penalty Kicks',
        category: 'Game',
        // prompt: `Play this game, your target score is 600`,
        image:
          'https://img.poki-cdn.com/cdn-cgi/image/q=78,scq=50,width=628,height=628,fit=cover,f=auto/0770daaa8c4ff3c36dd53e6e41f59396/penalty-kicks.png',
        agentOptions: {
          agentMode: {
            id: 'game',
            link: 'https://poki.com/zh/g/penalty-kicks',
            browserMode: 'hybrid',
          },
        },
      },
      {
        title: 'GUI Agent Research',
        category: 'Research',
        prompt: 'Search for the latest GUI Agent papers',
        image:
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center',
      },
      {
        title: 'UI TARS Information',
        category: 'Research',
        prompt: 'Find information about UI TARS',
        image:
          'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop&crop=center',
      },
      {
        title: 'ProductHunt Trends',
        category: 'Research',
        prompt: 'Tell me the top 5 most popular projects on ProductHunt today',
        image:
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop&crop=center',
      },
      {
        title: 'Python Hello World',
        category: 'Code',
        prompt: 'Write hello world using python',
        image:
          'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop&crop=center',
      },
      {
        title: 'Jupyter Math Comparison',
        category: 'Code',
        prompt: 'Use jupyter to calculate which is greater in 9.11 and 9.9',
        image:
          'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop&crop=center',
      },
      {
        title: 'Reproduce Seed-TARS',
        category: 'Code',
        prompt: 'Write code to reproduce seed-tars.com',
        image:
          'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop&crop=center',
      },
      {
        title: 'Seed-TARS Summary',
        category: 'Research',
        prompt: 'Summary seed-tars.com/1.5',
        image:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center',
      },
      {
        title: 'PDF to Markdown Converter',
        category: 'Code',
        prompt:
          'Write a python code to download the paper https://arxiv.org/abs/2505.12370, and convert the pdf to markdown',
        image:
          'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center',
      },
      {
        title: 'ByteDance News Website',
        category: 'Code',
        prompt:
          'Search news about bytedance seed1.6 model, then write a web page in modern style and deploy it',
        image:
          'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop&crop=center',
      },
      {
        title: 'Transformer Code Sample',
        category: 'Code',
        prompt: 'Write a minimal code sample to help me use transformer',
        image:
          'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop&crop=center',
      },
      {
        title: 'HuggingFace Dataset Analysis',
        category: 'Research',
        prompt:
          'Please search for trending datasets on Hugging Face, download the top-ranked dataset, and calculate the total number of characters in the entire dataset.',
        image:
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center',
      },
      {
        title: 'Political History Analysis',
        category: 'Research',
        prompt:
          "Identify the independence process of a twin-island nation where the pro-self-governance political group won thirteen out of seventeen legislative seats in spring 1980 national polls, a second constitutional conference was held at a historic London venue in late 1980, liberation from colonial rule is annually commemorated on November 1st as a public holiday, and an agreement revised the smaller island's local governance legislation for enhanced autonomy. What was the composition of the associated state that preceded its independence?",
        image:
          'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=300&fit=crop&crop=center',
      },
      {
        title: 'Music Theory Course Builder',
        category: 'Research',
        prompt:
          "I am a high school music theory teacher and i'm preparing a course on basic music theory to explain knowledge about music names, roll titles, major scales, octave distribution, and physical frequency. Please help me collect enough informations, design fulfilling and authoritative course content with demonstration animations, and finally output them as web page",
        image:
          'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center',
      },
    ],
    workspace: {
      navItems: [
        {
          title: 'Code Server',
          link: sandboxBaseUrl + '/code-server/',
          icon: 'code',
        },
        {
          title: 'VNC',
          link: sandboxBaseUrl + '/vnc/index.html?autoconnect=true',
          icon: 'monitor',
        },
      ],
    },
    guiAgent: {
      defaultScreenshotRenderStrategy: 'afterAction',
      enableScreenshotRenderStrategySwitch: true,
      renderGUIAction: true,
      renderBrowserShell: false,
    },
    layout: {
      enableLayoutSwitchButton: true,
    },
  };

  constructor(option: OmniTarsOption) {
    super(getComposableOption(option));
  }
}
