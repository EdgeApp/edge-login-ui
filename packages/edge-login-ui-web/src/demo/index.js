// @flow

import 'regenerator-runtime/runtime'

import React from 'react'
import { render } from 'react-dom'

import { Page } from './components/Page.js'

// Render the main component to the document body:
const root = document.getElementById('app')
if (root == null) throw new Error('Incorrect page HTML')
render(<Page />, root)
