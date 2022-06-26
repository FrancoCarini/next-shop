import { Fragment, useState } from 'react'
import { Grid } from '@mui/material'
import {
  AccessTimeOutlined,
  AttachMoneyOutlined,
  CancelPresentationOutlined,
  CategoryOutlined,
  CreditCardOffOutlined,
  DashboardOutlined,
  GroupOutlined,
  ProductionQuantityLimitsOutlined,
} from '@mui/icons-material'
import useSWR from 'swr'

import AdminLayout from '@/components/layouts/AdminLayout'
import SummaryCard from '@/components/admin/SummaryCard'

const DashboardPage = () => {
  const { data, error } = useSWR('/api/admin/dashboard', {
    refreshInterval: 60000,
  })

  if (!error && !data) {
    return <Fragment></Fragment>
  }

  const {
    numberOfProducts,
    productsNoStock,
    productsLowStock,
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
  } = data

  return (
    <AdminLayout
      title="Dashboard"
      subtitle="General Stats"
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        <SummaryCard
          title={numberOfOrders}
          subtitle="Total Orders"
          icon={
            <CreditCardOffOutlined color="secondary" sx={{ fontSize: 40 }} />
          }
        />
        <SummaryCard
          title={paidOrders}
          subtitle="Payed Orders"
          icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
        />
        <SummaryCard
          title={notPaidOrders}
          subtitle="Pending Payment"
          icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />}
        />
        <SummaryCard
          title={numberOfClients}
          subtitle="Clients"
          icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />}
        />
        <SummaryCard
          title={numberOfProducts}
          subtitle="Products"
          icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
        />
        <SummaryCard
          title={productsNoStock}
          subtitle="No Stock"
          icon={
            <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />
          }
        />
        <SummaryCard
          title={productsLowStock}
          subtitle="Low Stock"
          icon={
            <ProductionQuantityLimitsOutlined
              color="warning"
              sx={{ fontSize: 40 }}
            />
          }
        />
        <SummaryCard
          title={60}
          subtitle="Updates in"
          icon={<AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />}
        />
      </Grid>
    </AdminLayout>
  )
}

export default DashboardPage
