# Notification System Implementation

## ✅ Completed Frontend Implementation

This document outlines the notification system that has been implemented on the frontend.

### 📁 Files Created

#### Types & Interfaces
- `utils/types/notification.types.ts` - Notification types, interfaces, and enums

#### API Layer
- `apis/requests/notifications.requests.ts` - API request functions
- `apis/queries/notifications.queries.ts` - React Query hooks

#### Context
- `context/NotificationContext.tsx` - Notification context provider

#### Components
- `components/shared/NotificationBell.tsx` - Notification bell icon with badge
- `components/shared/NotificationDropdown.tsx` - Dropdown with notification list
- `components/shared/NotificationItem.tsx` - Individual notification item

#### Pages
- `app/notifications/page.tsx` - Full notifications page with filters

#### Database
- `database/migrations/create_notifications_table.sql` - SQL migration file (for review)

### 🔧 Files Modified

1. **app/layout.tsx**
   - Added `NotificationProvider` wrapper

2. **layout/MainLayout/Header.tsx**
   - Added `NotificationBell` component (mobile & desktop)

3. **translations/en.json**
   - Added notification-related translations

## 🚀 Features Implemented

### ✅ Real-time Notifications
- Socket.io integration for real-time notifications
- Auto-refresh unread count
- Toast notifications for important events

### ✅ Notification Bell
- Badge showing unread count
- Animation on new notifications
- Dropdown with recent notifications

### ✅ Notification Dropdown
- Shows last 10 notifications
- Mark all as read functionality
- View all notifications link
- Empty state handling

### ✅ Notifications Page
- Full list of notifications
- Filter by type (Order, Message, RFQ, Review, System)
- Filter by status (All, Unread, Read)
- Pagination support
- Delete individual notifications
- Mark all as read

### ✅ Notification Types
- ORDER - Order-related notifications
- MESSAGE - Chat/message notifications
- RFQ - RFQ quote notifications
- REVIEW - Review notifications
- SYSTEM - System notifications
- PAYMENT - Payment notifications
- SHIPMENT - Shipment notifications
- ACCOUNT - Account-related notifications

## 📋 Backend Requirements

### API Endpoints Needed

The frontend expects these endpoints to exist:

1. **GET /notification**
   - Query params: `page`, `limit`, `type`, `read`
   - Returns: `{ data: Notification[], total: number, page: number, limit: number, unreadCount: number }`

2. **GET /notification/unread-count**
   - Returns: `{ count: number }`

3. **PUT /notification/:id/read**
   - Returns: `{ data: Notification }`

4. **PUT /notification/read-all**
   - Returns: `{ count: number }`

5. **DELETE /notification/:id**
   - Returns: `{ success: boolean }`

6. **DELETE /notification**
   - Returns: `{ success: boolean, count: number }`

### Socket Events Needed

The frontend listens for these socket events:

1. **notification** - Emitted when a new notification is created
   ```typescript
   socket.on("notification", (notification: Notification) => {
     // Handle new notification
   });
   ```

2. **notification:count** - Emitted when unread count changes
   ```typescript
   socket.on("notification:count", (count: number) => {
     // Update unread count
   });
   ```

### Database Schema

See `database/migrations/create_notifications_table.sql` for the complete SQL schema.

**Important Notes:**
- Review the SQL file before executing
- The table uses `IF NOT EXISTS` to prevent errors
- Foreign key references `users` table (adjust if your table name is different)
- All indexes are included for optimal performance

## 🔄 How It Works

1. **User logs in** → NotificationProvider initializes
2. **Socket connects** → Listens for notification events
3. **New notification arrives** → 
   - Shows toast (for important types)
   - Updates unread count
   - Refreshes notification list
4. **User clicks bell** → Opens dropdown with recent notifications
5. **User clicks notification** → Marks as read and navigates to link
6. **User visits /notifications** → Full page with filters and pagination

## 🎨 UI/UX Features

- **Badge Animation**: Bell animates when new notification arrives
- **Unread Indicator**: Blue dot on unread notifications
- **Type Icons**: Different colored icons for each notification type
- **Responsive**: Works on mobile and desktop
- **Loading States**: Skeleton loaders while fetching
- **Empty States**: Friendly messages when no notifications

## 📝 Next Steps

### Backend Implementation

1. **Create notifications table** using the SQL migration file
2. **Implement API endpoints** as listed above
3. **Add socket events** for real-time notifications
4. **Create notification service** to handle:
   - Creating notifications
   - Marking as read
   - Deleting notifications
   - Getting unread count

### Integration Points

Add notification creation in these areas:

- **Order Service**: When order status changes
- **Chat Service**: When new message arrives
- **RFQ Service**: When quote is created/updated
- **Review Service**: When review is posted
- **Payment Service**: When payment is received
- **Account Service**: When account status changes

### Example Backend Code (Node.js/Express)

```typescript
// Create notification
const notification = await prisma.notification.create({
  data: {
    userId: targetUserId,
    type: 'ORDER',
    title: 'New Order',
    message: 'You have a new order #12345',
    link: '/orders/12345',
    data: { orderId: 12345 }
  }
});

// Emit via socket
io.to(`user-${targetUserId}`).emit('notification', notification);
io.to(`user-${targetUserId}`).emit('notification:count', unreadCount);
```

## ⚠️ Important Notes

1. **Database Migration**: Review `database/migrations/create_notifications_table.sql` before executing
2. **Socket Events**: Backend must emit `notification` and `notification:count` events
3. **API Endpoints**: All endpoints must return data in the expected format
4. **Authentication**: All endpoints should require authentication
5. **User ID**: Notifications are user-specific, ensure proper user context

## 🐛 Troubleshooting

### Notifications not showing
- Check if socket is connected
- Verify backend is emitting `notification` events
- Check browser console for errors

### Unread count not updating
- Verify `notification:count` socket event is being emitted
- Check API endpoint `/notification/unread-count` is working

### Dropdown not opening
- Check if user is logged in
- Verify NotificationProvider is in the component tree
- Check browser console for errors

## 📚 Additional Resources

- Socket.io documentation: https://socket.io/docs/
- React Query documentation: https://tanstack.com/query/latest
- Radix UI Popover: https://www.radix-ui.com/primitives/docs/components/popover

