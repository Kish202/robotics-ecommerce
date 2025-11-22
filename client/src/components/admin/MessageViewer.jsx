import React, { useState } from 'react';
import { Mail, MailOpen, Trash2, Reply, Archive, Star, Search } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Input from '../common/Input';
import Pagination from '../common/Pagination';
import Modal from '../common/Modal';

const MessageViewer = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      subject: 'Product Inquiry',
      message: 'Hi, I\'m interested in the RoboClean Pro X1. Does it work well on hardwood floors? Also, what is the warranty period?',
      date: '2024-01-15 10:30 AM',
      status: 'unread',
      priority: 'normal',
      starred: false,
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      subject: 'Shipping Question',
      message: 'I placed an order yesterday (Order #12345). Can you tell me when it will be shipped? I need it urgently.',
      date: '2024-01-15 09:15 AM',
      status: 'read',
      priority: 'high',
      starred: true,
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael.c@email.com',
      subject: 'Technical Support',
      message: 'My ChefBot stopped working after the latest update. It won\'t connect to WiFi anymore. Please help!',
      date: '2024-01-14 04:20 PM',
      status: 'archived',
      priority: 'urgent',
      starred: false,
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      email: 'emily.r@email.com',
      subject: 'Partnership Opportunity',
      message: 'Hello, I represent a retail chain and we\'re interested in carrying your products. Can we schedule a call to discuss?',
      date: '2024-01-14 02:45 PM',
      status: 'read',
      priority: 'high',
      starred: true,
    },
    {
      id: 5,
      name: 'David Wilson',
      email: 'david.w@email.com',
      subject: 'Return Request',
      message: 'I received the wrong product. I ordered a RoboClean but got a LawnMaster instead. How do I return it?',
      date: '2024-01-13 11:00 AM',
      status: 'unread',
      priority: 'normal',
      starred: false,
    },
  ]);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter messages
  const filteredMessages = messages.filter((message) => {
    const matchesStatus = filterStatus === 'all' || message.status === filterStatus;
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMessages = filteredMessages.slice(startIndex, startIndex + itemsPerPage);

  const handleMarkAsRead = (messageId) => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId ? { ...msg, status: 'read' } : msg
      )
    );
  };

  const handleMarkAsUnread = (messageId) => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId ? { ...msg, status: 'unread' } : msg
      )
    );
  };

  const handleArchive = (messageId) => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId ? { ...msg, status: 'archived' } : msg
      )
    );
  };

  const handleToggleStar = (messageId) => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId ? { ...msg, starred: !msg.starred } : msg
      )
    );
  };

  const handleDelete = (messageId) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      setMessages(messages.filter((msg) => msg.id !== messageId));
      setSelectedMessage(null);
    }
  };

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    if (message.status === 'unread') {
      handleMarkAsRead(message.id);
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="danger">Urgent</Badge>;
      case 'high':
        return <Badge variant="warning">High</Badge>;
      case 'normal':
        return <Badge variant="default">Normal</Badge>;
      default:
        return null;
    }
  };

  const stats = {
    total: messages.length,
    unread: messages.filter((m) => m.status === 'unread').length,
    read: messages.filter((m) => m.status === 'read').length,
    archived: messages.filter((m) => m.status === 'archived').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Messages
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage customer inquiries and messages
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Unread</p>
          <p className="text-3xl font-bold text-blue-600">{stats.unread}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Read</p>
          <p className="text-3xl font-bold text-green-600">{stats.read}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Archived</p>
          <p className="text-3xl font-bold text-gray-600">{stats.archived}</p>
        </Card>
      </div>

      <Card>
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-5 h-5" />}
            />
          </div>

          <div className="w-full md:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Messages</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Messages List */}
        <div className="space-y-3">
          {paginatedMessages.length > 0 ? (
            paginatedMessages.map((message) => (
              <div
                key={message.id}
                onClick={() => handleViewMessage(message)}
                className={`
                  p-4 rounded-lg cursor-pointer transition-all
                  ${
                    message.status === 'unread'
                      ? 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                      : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                `}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {message.status === 'unread' ? (
                      <Mail className="w-5 h-5 text-blue-600" />
                    ) : (
                      <MailOpen className="w-5 h-5 text-gray-400" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4
                        className={`font-semibold truncate ${
                          message.status === 'unread'
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {message.name}
                      </h4>
                      {getPriorityBadge(message.priority)}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1 truncate">
                      {message.email}
                    </p>
                    <p
                      className={`text-sm mb-1 ${
                        message.status === 'unread' ? 'font-medium' : ''
                      } text-gray-700 dark:text-gray-300`}
                    >
                      {message.subject}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {message.message}
                    </p>
                  </div>

                  {/* Meta */}
                  <div className="flex-shrink-0 text-right">
                    <div className="flex items-center gap-2 mb-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleStar(message.id);
                        }}
                        className="hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            message.starred
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-400'
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {message.date}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No Messages Found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </Card>

      {/* Message Detail Modal */}
      <Modal
        isOpen={!!selectedMessage}
        onClose={() => setSelectedMessage(null)}
        title="Message Details"
        size="lg"
      >
        {selectedMessage && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedMessage.subject}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {selectedMessage.name}
                  </p>
                  {getPriorityBadge(selectedMessage.priority)}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {selectedMessage.email}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {selectedMessage.date}
                </p>
              </div>
            </div>

            {/* Message Content */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                variant="primary"
                icon={<Reply className="w-4 h-4" />}
                onClick={() => {
                  window.location.href = `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`;
                }}
              >
                Reply
              </Button>
              <Button
                variant="outline"
                icon={<Archive className="w-4 h-4" />}
                onClick={() => {
                  handleArchive(selectedMessage.id);
                  setSelectedMessage(null);
                }}
              >
                Archive
              </Button>
              {selectedMessage.status === 'read' && (
                <Button
                  variant="outline"
                  onClick={() => {
                    handleMarkAsUnread(selectedMessage.id);
                  }}
                >
                  Mark as Unread
                </Button>
              )}
              <Button
                variant="danger"
                icon={<Trash2 className="w-4 h-4" />}
                onClick={() => handleDelete(selectedMessage.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MessageViewer;