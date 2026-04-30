<template>
  <span v-if="safeCode" class="flag-icon" :title="safeCode">
    <img
      :src="flagUrl"
      :alt="safeCode"
      height="24"
      style="vertical-align:middle; border-radius:3px; box-shadow:0 1px 2px #0001;"
    />
  </span>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  code: {
    type: String,
    required: true,
  },
})

const safeCode = computed(() =>
  typeof props.code === 'string' ? props.code.toUpperCase() : ''
)

const flagUrl = computed(() => {
  const iso3to2 = {
    ESP: 'ES', FRA: 'FR', DEU: 'DE', USA: 'US', UKR: 'UA', RUS: 'RU', ITA: 'IT',
    PRT: 'PT', BRA: 'BR', ARG: 'AR', MEX: 'MX', CHN: 'CN', JPN: 'JP', IND: 'IN',
    TUR: 'TR', GBR: 'GB', CAN: 'CA', AUS: 'AU', MAR: 'MA', NGA: 'NG', ZAF: 'ZA',
    EGY: 'EG', IRN: 'IR', ISR: 'IL', SAU: 'SA', KOR: 'KR', POL: 'PL', SWE: 'SE',
    CHE: 'CH', NLD: 'NL', BEL: 'BE', GRC: 'GR', HUN: 'HU', CZE: 'CZ', ROU: 'RO',
    SRB: 'RS', HRV: 'HR', SVK: 'SK', SVN: 'SI', BGR: 'BG', DNK: 'DK', FIN: 'FI',
    NOR: 'NO', AUT: 'AT', IRL: 'IE', EST: 'EE', LVA: 'LV', LTU: 'LT', BLR: 'BY',
    MDA: 'MD', GEO: 'GE', KAZ: 'KZ', ARM: 'AM', AZE: 'AZ', UZB: 'UZ', TKM: 'TM',
    KGZ: 'KG', TJK: 'TJ', MNG: 'MN', AFG: 'AF', PAK: 'PK', BGD: 'BD', NPL: 'NP',
    LKA: 'LK', THA: 'TH', VNM: 'VN', KHM: 'KH', LAO: 'LA', MMR: 'MM', MYS: 'MY',
    SGP: 'SG', IDN: 'ID', PHL: 'PH', NZL: 'NZ', CHL: 'CL', COL: 'CO', PER: 'PE',
    VEN: 'VE', ECU: 'EC', BOL: 'BO', PRY: 'PY', URY: 'UY', CUB: 'CU', DOM: 'DO',
    HND: 'HN', SLV: 'SV', GTM: 'GT', NIC: 'NI', CRI: 'CR', PAN: 'PA', JAM: 'JM',
    TTO: 'TT', HTI: 'HT', BHS: 'BS', GRD: 'GD', BRB: 'BB', ATG: 'AG', DMA: 'DM',
    KNA: 'KN', LCA: 'LC', VCT: 'VC', SUR: 'SR', GUY: 'GY', GUF: 'GF', GLP: 'GP',
    MTQ: 'MQ', REU: 'RE', PYF: 'PF', NCL: 'NC', WLF: 'WF', NFK: 'NF', COK: 'CK',
    NIU: 'NU', TKL: 'TK', TON: 'TO', TUV: 'TV', VUT: 'VU', FJI: 'FJ', SLB: 'SB',
    PNG: 'PG', PLW: 'PW', NRU: 'NR', KIR: 'KI', FSM: 'FM', MHL: 'MH'
  }

  let code = safeCode.value

  if (code.length === 3 && iso3to2[code]) {
    code = iso3to2[code]
  }

  if (code.length > 2) {
    code = code.slice(0, 2)
  }

  return `https://flagsapi.com/${code}/flat/32.png`
})
</script>

<style scoped>
.flag-icon {
  display: inline-block;
  margin-right: 0.2em;
}
</style>
