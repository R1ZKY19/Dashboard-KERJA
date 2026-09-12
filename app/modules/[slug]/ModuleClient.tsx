'use client'

import Link from 'next/link'
import type React from 'react'
import { ArrowLeft, Search, Plus, Trash2, Check, StickyNote, Calculator, ExternalLink, ShieldCheck, Activity, Users, Settings, Zap, RotateCcw } from 'lucide-react'
import { useMemo, useState } from 'react'
import { calculateBet, calcParlay, calcTogel, formatRp, TOGEL_BETS, CS_GUIDES, QUICK_LINKS, BANK_PROFILES, RRN_PROFILES } from '../cs-logic'

// Keep the existing CS feature workspace implementation and use the shared CS theme.
